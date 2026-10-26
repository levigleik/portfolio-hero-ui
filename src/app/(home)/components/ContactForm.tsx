"use client";

import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { type FormEvent, useRef, useState } from "react";
import { contactLimits, type ContactField } from "@/lib/contact/shared";
import { validateContact } from "@/lib/contact/validation";

const responseErrors = [
	"setup-required",
	"unavailable",
	"blocked",
	"invalid",
	"session",
	"too-fast",
	"rate-limit",
] as const;
type ResponseError = (typeof responseErrors)[number];

export default function ContactForm() {
	const t = useTranslations("ContactForm");
	const locale = useLocale();
	const token = useRef<{ value: string; expires: number } | null>(null);
	const pendingToken = useRef<Promise<string | null> | null>(null);
	const setupError = useRef<"setup-required" | null>(null);
	const submitting = useRef(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState<ResponseError | null>(null);
	const [errors, setErrors] = useState<Partial<Record<ContactField, boolean>>>(
		{},
	);
	const [retryAt, setRetryAt] = useState(0);

	async function prepareToken(): Promise<string | null> {
		if (setupError.current) return null;
		if (token.current && token.current.expires > Date.now())
			return token.current.value;
		if (pendingToken.current) return pendingToken.current;
		pendingToken.current = (async () => {
			try {
				const response = await fetch("/api/contact", {
					cache: "no-store",
					signal: AbortSignal.timeout(15000),
				});
				const data = await response.json();
				if (!response.ok || typeof data.token !== "string") {
					if (data.error === "setup-required") {
						setupError.current = data.error;
						setError(data.error);
					}
					return null;
				}
				token.current = {
					value: data.token,
					expires: Date.now() + 55 * 60 * 1000,
				};
				return data.token;
			} catch {
				return null;
			} finally {
				pendingToken.current = null;
			}
		})();
		return pendingToken.current;
	}

	async function submit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (submitting.current) return;
		if (Date.now() < retryAt) {
			setError("rate-limit");
			return;
		}
		const form = event.currentTarget;
		const values = new FormData(form);
		const payload = {
			name: String(values.get("name") ?? ""),
			email: String(values.get("email") ?? ""),
			phone: String(values.get("phone") ?? ""),
			message: String(values.get("message") ?? ""),
			website: String(values.get("website") ?? ""),
			locale,
		};
		const validated = validateContact(payload);
		if (!validated || Object.keys(validated.errors).length > 0) {
			const invalid: Partial<Record<ContactField, boolean>> = {};
			for (const field of ["name", "email", "phone", "message"] as const) {
				if (!validated || validated.errors[field]) invalid[field] = true;
			}
			setErrors(invalid);
			const first = Object.keys(invalid)[0];
			if (first)
				(form.elements.namedItem(first) as HTMLElement | null)?.focus();
			return;
		}
		submitting.current = true;
		setIsSubmitting(true);
		setError(null);
		setErrors({});
		try {
			const formToken = await prepareToken();
			if (!formToken) {
				setError(setupError.current || "unavailable");
				return;
			}
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				signal: AbortSignal.timeout(20000),
				body: JSON.stringify({
					...payload,
					token: formToken,
				}),
			});
			const data = await response.json();
			if (!response.ok || data.success !== true) {
				const code = responseErrors.includes(data.error)
					? (data.error as ResponseError)
					: "unavailable";
				setError(code);
				if (code === "session") {
					token.current = null;
					void prepareToken();
				}
				if (response.status === 429)
					setRetryAt(
						Date.now() +
							Math.min(
								86400,
								Math.max(1, Number(response.headers.get("Retry-After")) || 60),
							) *
								1000,
					);
				if (data.fields && typeof data.fields === "object") {
					const invalid: Partial<Record<ContactField, boolean>> = {};
					for (const field of ["name", "email", "phone", "message"] as const)
						if (data.fields[field]) invalid[field] = true;
					setErrors(invalid);
					const first = Object.keys(invalid)[0];
					if (first)
						(form.elements.namedItem(first) as HTMLElement | null)?.focus();
				}
				return;
			}
			form.reset();
			token.current = null;
			setSuccess(true);
		} catch {
			setError("unavailable");
		} finally {
			submitting.current = false;
			setIsSubmitting(false);
		}
	}

	if (success)
		return (
			<div
				className="contact-form contact-success"
				role="status"
				aria-live="polite"
			>
				<CheckCircle2 size={38} strokeWidth={1.5} aria-hidden="true" />
				<h3>{t("success-title")}</h3>
				<p>{t("success-description")}</p>
				<Button
					className="contact-submit"
					onPress={() => {
						setSuccess(false);
						void prepareToken();
					}}
				>
					{t("send-another")}
					<ArrowUpRight size={18} aria-hidden="true" />
				</Button>
			</div>
		);

	const classes = {
		base: "contact-field",
		label: "contact-field-label",
		inputWrapper: "contact-input-wrapper",
		input: "contact-input",
		errorMessage: "contact-field-error",
	};
	return (
		<form
			noValidate
			className="contact-form"
			aria-label={t("title")}
			onSubmit={submit}
			onFocusCapture={() => {
				void prepareToken();
			}}
			onChange={(event) => {
				const target = event.target;
				if (
					!(target instanceof HTMLInputElement) &&
					!(target instanceof HTMLTextAreaElement)
				)
					return;
				const field = target.name as ContactField;
				if (errors[field])
					setErrors((current) => ({ ...current, [field]: false }));
			}}
		>
			<div className="contact-form-heading">
				<h3>{t("title")}</h3>
			</div>
			<div className="contact-form-row">
				<Input
					name="name"
					label={t("name")}
					placeholder={t("name-placeholder")}
					autoComplete="name"
					isRequired
					minLength={2}
					maxLength={contactLimits.name}
					labelPlacement="outside"
					variant="bordered"
					radius="md"
					classNames={classes}
					isInvalid={errors.name}
					errorMessage={errors.name ? t("invalid-name") : undefined}
					validationBehavior="aria"
					isReadOnly={isSubmitting}
				/>
				<Input
					name="email"
					type="email"
					label={t("email")}
					placeholder={t("email-placeholder")}
					autoComplete="email"
					isRequired
					maxLength={contactLimits.email}
					labelPlacement="outside"
					variant="bordered"
					radius="md"
					classNames={classes}
					isInvalid={errors.email}
					errorMessage={errors.email ? t("invalid-email") : undefined}
					validationBehavior="aria"
					isReadOnly={isSubmitting}
				/>
			</div>
			<Input
				name="phone"
				type="tel"
				label={t("phone")}
				placeholder={t("phone-placeholder")}
				autoComplete="tel"
				maxLength={contactLimits.phone}
				labelPlacement="outside"
				variant="bordered"
				radius="md"
				classNames={classes}
				isInvalid={errors.phone}
				errorMessage={errors.phone ? t("invalid-phone") : undefined}
				validationBehavior="aria"
				isReadOnly={isSubmitting}
			/>
			<Textarea
				name="message"
				label={t("message")}
				placeholder={t("message-placeholder")}
				isRequired
				minLength={10}
				maxLength={contactLimits.message}
				minRows={5}
				maxRows={10}
				labelPlacement="outside"
				variant="bordered"
				radius="md"
				classNames={classes}
				isInvalid={errors.message}
				errorMessage={errors.message ? t("invalid-message") : undefined}
				validationBehavior="aria"
				isReadOnly={isSubmitting}
			/>
			<div className="contact-honeypot" aria-hidden="true">
				<label htmlFor="contact-website">Website</label>
				<input
					id="contact-website"
					name="website"
					type="text"
					tabIndex={-1}
					autoComplete="off"
				/>
			</div>
			<div aria-live="polite" aria-atomic="true">
				{error && (
					<p className="contact-form-error" role="alert">
						{t(error)}
					</p>
				)}
			</div>
			<div className="contact-form-actions">
				<p>{t("privacy")}</p>
				<Button
					type="submit"
					className="contact-submit"
					isLoading={isSubmitting}
					isDisabled={isSubmitting}
				>
					{t(isSubmitting ? "sending" : "send")}
					<ArrowUpRight size={19} aria-hidden="true" />
				</Button>
			</div>
		</form>
	);
}
