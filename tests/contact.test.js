import { beforeEach, describe, expect, mock, test } from "bun:test";
import {
	contactFingerprint,
	issueContactToken,
	minimumFillTime,
	tokenLifetime,
	verifyContactToken,
} from "../src/lib/contact/token";
import {
	normalizeContactEmail,
	validateContact,
} from "../src/lib/contact/validation";

// No requests to Arcjet or Resend and no real emails during automated tests.
const send = mock(async () => ({ data: { id: "test-delivery" }, error: null }));
const protect = mock(async () => allowed());
mock.module("server-only", () => ({}));
mock.module("resend", () => ({
	Resend: class {
		emails = { send };
	},
}));
mock.module("@arcjet/next", () => ({
	default: () => ({ protect }),
	detectBot: () => [],
	validateEmail: () => [],
	fixedWindow: () => [],
	slidingWindow: () => [],
}));
const { GET, POST } = await import("../src/app/api/contact/route");
const secret = "aj_prj_key_test_only_not_a_real_credential";
const validFields = {
	name: "Maria Silva",
	email: "visitor+portfolio@gmail.com",
	phone: "",
	message: "Gostaria de conversar sobre um novo projeto.",
};
const validBody = () => ({
	...validFields,
	website: "",
	locale: "pt-BR",
	token: issueContactToken(secret, Date.now() - 5000),
});

function allowed() {
	return { isErrored: () => false, isDenied: () => false, results: [] };
}
function denied(kind) {
	return {
		...allowed(),
		isDenied: () => true,
		reason: {
			isRateLimit: () => kind === "rate",
			isEmail: () => kind === "email",
			resetTime: new Date(Date.now() + 30000),
		},
	};
}
function request(body, options = {}) {
	return new Request("https://gleiksoft.dev/api/contact", {
		method: "POST",
		headers: {
			origin: "https://gleiksoft.dev",
			"content-type": "application/json",
			...options.headers,
		},
		body: typeof body === "string" ? body : JSON.stringify(body),
	});
}

beforeEach(() => {
	process.env.RESEND_API_KEY = "re_test_only_not_a_real_credential";
	process.env.ARCJET_KEY = secret;
	delete process.env.CONTACT_SITE_URL;
	delete process.env.CONTACT_FROM_EMAIL;
	delete process.env.CONTACT_TO_EMAIL;
	protect.mockReset();
	protect.mockResolvedValue(allowed());
	send.mockReset();
	send.mockResolvedValue({ data: { id: "test-delivery" }, error: null });
});

describe("email aliases and form validation", () => {
	test("Gmail aliases, dots and googlemail share a limit identity", () => {
		expect(normalizeContactEmail("Vis.itor+1254@googlemail.com")).toBe(
			"visitor@gmail.com",
		);
		expect(normalizeContactEmail("visitor@gmail.com")).toBe(
			"visitor@gmail.com",
		);
	});
	test("custom domain addresses retain their case, dots and plus suffix", () => {
		expect(normalizeContactEmail("Maria.Silva+projeto@Company.dev")).toBe(
			"Maria.Silva+projeto@company.dev",
		);
	});
	test("telephone may be absent and international numbers are accepted", () => {
		expect(validateContact(validFields).errors).toEqual({});
		expect(
			validateContact({ ...validFields, phone: undefined }).errors,
		).toEqual({});
		expect(
			validateContact({ ...validFields, phone: "+55 (85) 99999-9999" }).errors,
		).toEqual({});
	});
	test("rejects invalid types, header injection, overlong and empty fields", () => {
		expect(validateContact(null)).toBeNull();
		expect(validateContact([])).toBeNull();
		const result = validateContact({
			name: "Maria\r\nBcc: someone",
			email: "bad-address",
			phone: "ligue para mim",
			message: "a".repeat(5001),
		});
		expect(Object.keys(result.errors).sort()).toEqual([
			"email",
			"message",
			"name",
			"phone",
		]);
		expect(
			validateContact({ ...validFields, message: 123 }).errors.message,
		).toBeTruthy();
	});
});

describe("signed server timing", () => {
	const now = 1793010000000;
	test("accepts signed tokens only after the minimum fill time", () => {
		const token = issueContactToken(secret, now);
		expect(verifyContactToken(token, secret, now + 1)).toEqual({
			error: "too-fast",
		});
		expect(
			verifyContactToken(token, secret, now + minimumFillTime).id,
		).toBeTruthy();
	});
	test("rejects forged, expired, future and differently signed tokens", () => {
		const token = issueContactToken(secret, now);
		expect(
			verifyContactToken(
				token.replace(String(now), String(now - 10000)),
				secret,
				now + 5000,
			).error,
		).toBe("session");
		expect(verifyContactToken(token, "another-key", now + 5000).error).toBe(
			"session",
		);
		expect(
			verifyContactToken(token, secret, now + tokenLifetime + 1).error,
		).toBe("session");
		expect(verifyContactToken(token, secret, now - 1).error).toBe("session");
	});
});

describe("contact API boundary", () => {
	test("accepts a project key and reports missing setup safely", async () => {
		const originalEnvironment = process.env.NODE_ENV;
		try {
			process.env.NODE_ENV = "development";
			delete process.env.ARCJET_KEY;
			expect(await (await GET()).json()).toEqual({ error: "setup-required" });
			process.env.ARCJET_KEY = secret;
			expect((await GET()).status).toBe(200);
			process.env.NODE_ENV = "production";
			delete process.env.ARCJET_KEY;
			expect(await (await GET()).json()).toEqual({ error: "unavailable" });
			expect(send).not.toHaveBeenCalled();
		} finally {
			if (originalEnvironment === undefined) delete process.env.NODE_ENV;
			else process.env.NODE_ENV = originalEnvironment;
		}
	});
	test("token responses cannot be cached and missing keys fail closed", async () => {
		expect((await GET()).headers.get("cache-control")).toBe("no-store");
		delete process.env.ARCJET_KEY;
		expect((await GET()).status).toBe(503);
		expect((await POST(request(validBody()))).status).toBe(503);
		expect(send).not.toHaveBeenCalled();
	});
	test("rejects cross-origin and malformed requests before external services", async () => {
		expect(
			(
				await POST(
					request(validBody(), { headers: { origin: "https://other.test" } }),
				)
			).status,
		).toBe(403);
		expect(
			(
				await POST(
					request(validBody(), { headers: { "content-type": "text/plain" } }),
				)
			).status,
		).toBe(415);
		expect((await POST(request("not json"))).status).toBe(400);
		expect((await POST(request("null"))).status).toBe(400);
		expect(protect).not.toHaveBeenCalled();
		expect(send).not.toHaveBeenCalled();
	});
	test("accepts the actual request origin on localhost and www, even with an obsolete site URL", async () => {
		process.env.CONTACT_SITE_URL = "https://gleiksoft.dev";
		for (const origin of ["http://localhost:3005", "https://www.gleiksoft.dev"]) {
			const response = await POST(
				new Request(`${origin}/api/contact`, {
					method: "POST",
					headers: { origin, "content-type": "text/plain" },
					body: "diagnostic",
				}),
			);
			expect(response.status).toBe(415);
		}
		expect(send).not.toHaveBeenCalled();
	});
	test("bounds body bytes even without a Content-Length header", async () => {
		const req = request({ ...validBody(), message: "字".repeat(12000) });
		req.headers.delete("content-length");
		expect((await POST(req)).status).toBe(413);
		expect(send).not.toHaveBeenCalled();
	});
	test("honeypot, missing tokens, fast submissions and field errors never send", async () => {
		expect(
			(await POST(request({ ...validBody(), website: "https://spam.test" })))
				.status,
		).toBe(403);
		expect((await POST(request({ ...validBody(), token: "" }))).status).toBe(
			400,
		);
		const fast = await POST(
			request({ ...validBody(), token: issueContactToken(secret) }),
		);
		expect(fast.status).toBe(429);
		expect(fast.headers.get("retry-after")).toBe("3");
		const invalid = await POST(request({ ...validBody(), message: "Oi" }));
		expect(invalid.status).toBe(400);
		expect((await invalid.json()).fields.message).toBeTruthy();
		expect(send).not.toHaveBeenCalled();
	});
	test("honors rate limits, bot denials and disposable email decisions", async () => {
		protect.mockResolvedValue(denied("rate"));
		const response = await POST(request(validBody()));
		expect(response.status).toBe(429);
		expect(Number(response.headers.get("retry-after"))).toBeGreaterThan(0);
		protect.mockResolvedValue(denied("bot"));
		expect((await POST(request(validBody()))).status).toBe(403);
		protect.mockResolvedValue(denied("email"));
		expect((await POST(request(validBody()))).status).toBe(400);
		expect(send).not.toHaveBeenCalled();
	});
	test("fails closed when Arcjet or even one rule is unavailable", async () => {
		protect.mockRejectedValueOnce(new Error("provider offline"));
		expect((await POST(request(validBody()))).status).toBe(503);
		protect.mockResolvedValue({
			...allowed(),
			results: [{ reason: { isError: () => true } }],
		});
		expect((await POST(request(validBody()))).status).toBe(503);
		expect(send).not.toHaveBeenCalled();
	});
	test("preserves reply-to, uses configured forwarding recipient and hashes the rate identity", async () => {
		const response = await POST(request(validBody()));
		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({ success: true });
		const [email, options] = send.mock.calls[0];
		expect(email.to).toBe("contato@gleiksoft.dev");
		expect(email.from).toContain("formulario@envio.gleiksoft.dev");
		expect(email.replyTo).toBe(validFields.email);
		expect(email.text).toContain("Telefone: Não informado");
		expect(email.html).toBeUndefined();
		expect(options.idempotencyKey).toMatch(/^contact\/[a-f0-9]{64}$/);
		const fingerprint = protect.mock.calls[0][1].emailKey;
		expect(fingerprint).toBe(
			contactFingerprint(secret, "email", "visitor@gmail.com"),
		);
	});
	test("provider failure is never reported as a successful delivery", async () => {
		send.mockResolvedValue({
			data: null,
			error: { message: "sensitive provider detail" },
		});
		const response = await POST(request(validBody()));
		expect(response.status).toBe(503);
		expect(await response.json()).toEqual({ error: "unavailable" });
	});
});
