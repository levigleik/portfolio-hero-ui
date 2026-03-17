"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export default function ProjectHeader() {
	const t = useTranslations("Projects");

	return (
		<div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
			<div className="max-w-3xl">
				<span className="section-kicker">{t("featured-tag")}</span>
				<h2 className="mt-6 text-4xl font-black uppercase tracking-[-0.06em] text-[var(--page-text)] sm:text-5xl">
					{t("projects")}
				</h2>
				<p className="mt-5 text-base leading-8 text-[var(--page-muted)] sm:text-lg">
					{t("featured-description")}
				</p>
			</div>

			<Link href="/projects" className="action-secondary w-fit">
				{t("view-all-projects")}
			</Link>
		</div>
	);
}
