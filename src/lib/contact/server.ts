import "server-only";
import arcjet, {
	detectBot,
	fixedWindow,
	slidingWindow,
	validateEmail,
} from "@arcjet/next";
import { Resend } from "resend";

export function getContactConfig() {
	const resendKey = process.env.RESEND_API_KEY;
	const arcjetKey = process.env.ARCJET_KEY;
	if (getContactSetupIssue() || !resendKey || !arcjetKey) return null;
	return {
		resendKey,
		arcjetKey,
		from:
			process.env.CONTACT_FROM_EMAIL ||
			"Portfólio Levi Gleik <formulario@envio.gleiksoft.dev>",
		to: process.env.CONTACT_TO_EMAIL || "contato@gleiksoft.dev",
	};
}

export function getContactSetupIssue() {
	if (!process.env.RESEND_API_KEY || !process.env.ARCJET_KEY)
		return "setup-required" as const;
	return null;
}

function createProtection(key: string) {
	return arcjet({
		key,
		rules: [
			detectBot({ mode: "LIVE", allow: [] }),
			validateEmail({
				mode: "LIVE",
				deny: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
			}),
			slidingWindow({
				mode: "LIVE",
				characteristics: ["ip.src"],
				interval: "15m",
				max: 3,
			}),
			slidingWindow({
				mode: "LIVE",
				characteristics: ["ip.src"],
				interval: "30s",
				max: 1,
			}),
			slidingWindow({
				mode: "LIVE",
				characteristics: ["emailKey"],
				interval: "1h",
				max: 3,
			}),
			// All instances share these counters in Arcjet, including the daily budget.
			fixedWindow({
				mode: "LIVE",
				characteristics: ["formKey"],
				window: "24h",
				max: 90,
			}),
			fixedWindow({
				mode: "LIVE",
				characteristics: ["messageKey"],
				window: "10m",
				max: 1,
			}),
		],
	});
}

let protection: ReturnType<typeof createProtection> | undefined;
let protectionKey: string | undefined;

export function getContactProtection(key: string) {
	if (!protection || protectionKey !== key) {
		protection = createProtection(key);
		protectionKey = key;
	}
	return protection;
}

export function getContactMailer(key: string) {
	return new Resend(key);
}
