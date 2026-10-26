import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";

export const minimumFillTime = 3000;
export const tokenLifetime = 60 * 60 * 1000;

export function contactFingerprint(
	secret: string,
	purpose: string,
	value: string,
) {
	return createHmac("sha256", secret)
		.update(`contact:v1:${purpose}:${value}`)
		.digest("hex");
}

export function issueContactToken(secret: string, now = Date.now()) {
	const payload = `${now}.${randomUUID()}`;
	return `${payload}.${contactFingerprint(secret, "token", payload)}`;
}

export function verifyContactToken(
	token: unknown,
	secret: string,
	now = Date.now(),
) {
	if (typeof token !== "string" || token.length > 200)
		return { error: "session" } as const;
	const parts = token.split(".");
	if (
		parts.length !== 3 ||
		!/^\d{13}$/.test(parts[0]) ||
		!/^[a-f\d-]{36}$/.test(parts[1]) ||
		!/^[a-f\d]{64}$/.test(parts[2])
	)
		return { error: "session" } as const;
	const payload = `${parts[0]}.${parts[1]}`;
	const expected = contactFingerprint(secret, "token", payload);
	if (
		!timingSafeEqual(Buffer.from(parts[2], "hex"), Buffer.from(expected, "hex"))
	)
		return { error: "session" } as const;
	const age = now - Number(parts[0]);
	if (age < 0 || age > tokenLifetime) return { error: "session" } as const;
	if (age < minimumFillTime) return { error: "too-fast" } as const;
	return { id: parts[1] } as const;
}
