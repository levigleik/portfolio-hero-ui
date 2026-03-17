"use client";

import { type AppLocale } from "@/i18n/config";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { FaEnvelope, FaFilePdf, FaGithub, FaLinkedin } from "react-icons/fa";

const fadeUp = {
	initial: { opacity: 0, y: 24 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true, amount: 0.35 },
	transition: { duration: 0.6, ease: "easeOut" },
};

const stack = [
	"React",
	"Next.js",
	"TypeScript",
	"Node.js",
	"Nest.js",
	"REST APIs",
];

export default function AboutSection() {
	const t = useTranslations("HomePage");
	const locale = useLocale() as AppLocale;
	const resumePathByLocale: Record<AppLocale, string> = {
		"pt-BR": "/resume-pt-BR.pdf",
		en: "/resume-en.pdf",
		es: "/resume-en.pdf",
		fr: "/resume-en.pdf",
		it: "/resume-en.pdf",
		zh: "/resume-en.pdf",
	};

	return (
		<section id="hero" className="section-shell scroll-mt-32 pt-32 sm:pt-36">
			<div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_360px] lg:items-center">
				<motion.div {...fadeUp}>
					<span className="section-kicker">{t("hero-label")}</span>

					<h1 className="mt-6 max-w-4xl text-5xl font-black uppercase leading-[0.94] tracking-[-0.08em] text-[var(--page-text)] sm:text-6xl lg:text-7xl xl:text-[5.4rem]">
						{t.rich("hero-title", {
							highlight: (chunks) => (
								<span className="text-glow text-[var(--brand)]">{chunks}</span>
							),
						})}
					</h1>

					<p className="mt-6 max-w-2xl text-base leading-8 text-[var(--page-muted)] sm:text-lg">
						{t("hero-description")}
					</p>

					<div className="mt-8 flex flex-col gap-4 sm:flex-row">
						<a href="#projects" className="action-primary">
							{t("explore-projects")}
						</a>
						<a href="#contact" className="action-secondary">
							{t("contact-me")}
						</a>
						<a href="#about" className="action-secondary">
							{t("about")}
						</a>
					</div>

					<div className="mt-8 flex flex-wrap gap-3">
						<a
							href="https://github.com/levigleik"
							target="_blank"
							rel="noreferrer"
							className="action-secondary"
						>
							<FaGithub size={16} />
							{t("github")}
						</a>

						<a
							href="https://linkedin.com/in/levi-gleik"
							target="_blank"
							rel="noreferrer"
							className="action-secondary"
						>
							<FaLinkedin size={16} />
							{t("linkedin")}
						</a>

						<a href="mailto:levigleik@gmail.com" className="action-secondary">
							<FaEnvelope size={16} />
							{t("email")}
						</a>

						<a
							href={resumePathByLocale[locale]}
							target="_blank"
							rel="noreferrer"
							className="action-secondary"
						>
							<FaFilePdf size={16} />
							{t("resume")}
						</a>
					</div>
				</motion.div>

				<motion.aside
					{...fadeUp}
					transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
					className="glass-panel rounded-[32px] p-6 sm:p-8"
				>
					<span className="section-kicker">{t("snapshot-label")}</span>

					<div className="mt-7 space-y-7">
						<div>
							<p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--page-muted)]">
								{t("role-label")}
							</p>
							<p className="mt-3 text-3xl font-semibold tracking-tight text-[var(--page-text)]">
								{t("front-end-developer")}
							</p>
						</div>

						<div>
							<p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--page-muted)]">
								{t("stack-label")}
							</p>
							<div className="mt-4 flex flex-wrap gap-2">
								{stack.map((item) => (
									<span key={item} className="project-chip">
										{item}
									</span>
								))}
							</div>
						</div>

						<div>
							<p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--page-muted)]">
								{t("contact-label")}
							</p>
							<div className="mt-4 grid gap-3">
								<a
									href="mailto:levigleik@gmail.com"
									className="rounded-[24px] border border-[var(--page-border)] bg-[var(--page-panel-strong)] px-4 py-3 transition-colors hover:border-[var(--page-border-strong)]"
								>
									<span className="block text-xs font-semibold uppercase tracking-[0.26em] text-[var(--page-muted)]">
										{t("email")}
									</span>
									<span className="mt-2 block text-sm font-medium text-[var(--page-text)]">
										levigleik@gmail.com
									</span>
								</a>

								<a
									href="https://linkedin.com/in/levi-gleik"
									target="_blank"
									rel="noreferrer"
									className="rounded-[24px] border border-[var(--page-border)] bg-[var(--page-panel-strong)] px-4 py-3 transition-colors hover:border-[var(--page-border-strong)]"
								>
									<span className="block text-xs font-semibold uppercase tracking-[0.26em] text-[var(--page-muted)]">
										LinkedIn
									</span>
									<span className="mt-2 block text-sm font-medium text-[var(--page-text)]">
										linkedin.com/in/levi-gleik
									</span>
								</a>
							</div>
						</div>
					</div>
				</motion.aside>
			</div>
		</section>
	);
}
