import isEmail from "validator/lib/isEmail";
import normalizeEmail from "validator/lib/normalizeEmail";
import { isAppLocale } from "@/i18n/config";
import { contactLimits, type ContactField, type ContactFields } from "./shared";

export function validateContact(value: unknown) {
	if (!value || typeof value !== "object" || Array.isArray(value)) return null;
	const input = value as Record<string, unknown>;
	const fields: ContactFields = { name: "", email: "", phone: "", message: "" };
	const errors: Partial<Record<ContactField, string>> = {};
	for (const field of Object.keys(fields) as ContactField[]) {
		if (field === "phone" && input[field] === undefined) continue;
		if (typeof input[field] !== "string") {
			errors[field] = `invalid-${field}`;
			continue;
		}
		fields[field] = (input[field] as string).trim();
		if (fields[field].length > contactLimits[field])
			errors[field] = `invalid-${field}`;
	}
	if (fields.name.length < 2 || /[\r\n\x00-\x1f\x7f]/.test(fields.name))
		errors.name = "invalid-name";
	if (
		!isEmail(fields.email, {
			allow_utf8_local_part: false,
			allow_ip_domain: false,
		})
	)
		errors.email = "invalid-email";
	if (
		fields.phone &&
		(!/^[+\d\s().-]+$/.test(fields.phone) ||
			!/^\d{7,15}$/.test(fields.phone.replace(/\D/g, "")) ||
			/[\r\n]/.test(fields.phone))
	)
		errors.phone = "invalid-phone";
	if (
		fields.message.length < 10 ||
		/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(fields.message)
	)
		errors.message = "invalid-message";
	return {
		fields,
		errors,
		locale:
			typeof input.locale === "string" && isAppLocale(input.locale)
				? input.locale
				: "pt-BR",
	};
}

export function normalizeContactEmail(email: string) {
	// Only fold aliases for providers with documented equivalent mailboxes.
	return (
		normalizeEmail(email, {
			all_lowercase: false,
			outlookdotcom_remove_subaddress: false,
			yahoo_remove_subaddress: false,
			icloud_remove_subaddress: false,
		}) || email
	);
}
