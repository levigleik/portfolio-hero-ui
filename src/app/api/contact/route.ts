import { NextResponse } from "next/server";
import {
	getContactConfig,
	getContactMailer,
	getContactProtection,
	getContactSetupIssue,
} from "@/lib/contact/server";
import {
	contactFingerprint,
	issueContactToken,
	verifyContactToken,
} from "@/lib/contact/token";
import {
	normalizeContactEmail,
	validateContact,
} from "@/lib/contact/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const maxBodyBytes = 32 * 1024;

function respond(body: object, status = 200, retryAfter?: number) {
	return NextResponse.json(body, {
		status,
		headers: {
			"Cache-Control": "no-store",
			...(retryAfter ? { "Retry-After": String(retryAfter) } : {}),
		},
	});
}

export async function GET() {
	const config = getContactConfig();
	if (!config)
		return respond(
			{
				error:
					process.env.NODE_ENV === "development"
						? getContactSetupIssue() || "unavailable"
						: "unavailable",
			},
			503,
		);
	return respond({ token: issueContactToken(config.arcjetKey) });
}

export async function POST(request: Request) {
	try {
		const origin = new URL(request.url).origin;
		if (request.headers.get("origin") !== origin)
			return respond({error: "blocked"}, 403);

		if (
			request.headers.get("content-type")?.split(";")[0].trim() !==
			"application/json"
		)
			return respond({ error: "invalid" }, 415);
		if (Number(request.headers.get("content-length")) > maxBodyBytes)
			return respond({ error: "invalid" }, 413);
		// Bound the actual stream too: Content-Length is optional and untrusted.
		const reader = request.body?.getReader();
		if (!reader) return respond({ error: "invalid" }, 400);
		const chunks: Uint8Array[] = [];
		let size = 0;
		try {
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				size += value.byteLength;
				if (size > maxBodyBytes) {
					await reader.cancel();
					return respond({ error: "invalid" }, 413);
				}
				chunks.push(value);
			}
		} finally {
			reader.releaseLock();
		}
		let input: Record<string, unknown>;
		try {
			input = JSON.parse(Buffer.concat(chunks).toString("utf8"));
		} catch {
			return respond({ error: "invalid" }, 400);
		}
		const validated = validateContact(input);
		if (!validated) return respond({ error: "invalid" }, 400);
		// A populated honeypot must never call the mail provider.
		if (typeof input.website !== "string" || input.website !== "")
			return respond({ error: "blocked" }, 403);
		if (Object.keys(validated.errors).length)
			return respond({ error: "invalid", fields: validated.errors }, 400);
		const config = getContactConfig();
		if (!config) return respond({ error: "unavailable" }, 503);
		const token = verifyContactToken(input.token, config.arcjetKey);
		if (token.error)
			return respond(
				{ error: token.error },
				token.error === "too-fast" ? 429 : 400,
				token.error === "too-fast" ? 3 : undefined,
			);
		const { fields, locale } = validated;
		const emailKey = contactFingerprint(
			config.arcjetKey,
			"email",
			normalizeContactEmail(fields.email),
		);
		const messageKey = contactFingerprint(
			config.arcjetKey,
			"message",
			`${emailKey}:${fields.message.replace(/\s+/g, " ").toLowerCase()}`,
		);
		const decision = await getContactProtection(config.arcjetKey).protect(
			request,
			{
				email: fields.email,
				emailKey,
				messageKey,
				formKey: "portfolio-contact-v1",
			},
		);
		// Arcjet can allow a request while an individual rule has failed. Fail closed.
		if (
			decision.isErrored() ||
			decision.results.some((result) => result.reason.isError())
		)
			return respond({ error: "unavailable" }, 503);
		if (decision.isDenied()) {
			if (decision.reason.isRateLimit())
				return respond(
					{ error: "rate-limit" },
					429,
					Math.max(
						1,
						Math.ceil(
							decision.reason.resetTime
								? (decision.reason.resetTime.getTime() - Date.now()) / 1000
								: 60,
						),
					),
				);
			if (decision.reason.isEmail())
				return respond(
					{ error: "invalid", fields: { email: "invalid-email" } },
					400,
				);
			return respond({ error: "blocked" }, 403);
		}
		const { data, error } = await getContactMailer(
			config.resendKey,
		).emails.send(
			{
				from: config.from,
				to: config.to,
				replyTo: fields.email,
				subject: `Contato pelo portfólio — ${fields.name}`,
				text: [
					"Novo contato pelo portfólio",
					"",
					`Nome: ${fields.name}`,
					`Email: ${fields.email}`,
					`Telefone: ${fields.phone || "Não informado"}`,
					`Idioma: ${locale}`,
					"",
					"Mensagem:",
					fields.message,
				].join("\n"),
			},
			{
				idempotencyKey: `contact/${contactFingerprint(config.arcjetKey, "delivery", JSON.stringify({ ...fields, locale }))}`,
			},
		);
		if (error || !data?.id) return respond({ error: "unavailable" }, 503);
		return respond({ success: true });
	} catch {
		// Do not send provider details, submitted messages, or credentials to the client.
		return respond({ error: "unavailable" }, 503);
	}
}
