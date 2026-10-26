"use client";

import { ArrowUpRight, FileText } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export default function ResumeLink() {
	const locale = useLocale();
	const t = useTranslations("HomePage");
	return (
		<a
			className="resume-link"
			aria-label={`${t("view-resume")} (PDF)`}
			href={locale === "pt-BR" ? "/resume-pt-BR.pdf" : "/resume-en.pdf"}
			target="_blank"
			rel="noreferrer"
		>
			<FileText size={18} aria-hidden="true" />
			<span>{t("view-resume")}</span>
			<span className="resume-format" aria-hidden="true">PDF</span>
			<ArrowUpRight size={16} aria-hidden="true" />
		</a>
	);
}
