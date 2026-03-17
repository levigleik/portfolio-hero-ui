"use client";

import ProjectSection from "@/components/project/ProjectSection";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FaEnvelope, FaLinkedin } from "react-icons/fa";
import AboutSection from "./AboutSection";
import TabExperience from "./TabExperience";
import TabFormation from "./TabFormation";

function SectionIntro({
	badge,
	title,
	description,
}: {
	badge: string;
	title: string;
	description: string;
}) {
	return (
		<div className="mx-auto mb-14 max-w-3xl text-center">
			<span className="section-kicker">{badge}</span>
			<h2 className="mt-6 text-4xl font-black uppercase tracking-[-0.01em] text-[var(--page-text)] sm:text-5xl">
				{title}
			</h2>
			<p className="mt-5 text-base leading-8 text-[var(--page-muted)] sm:text-lg">
				{description}
			</p>
		</div>
	);
}

export default function HomeComp() {
	const t = useTranslations("HomePage");
	const aboutStack = [
		"JavaScript",
		"TypeScript",
		"React.js",
		"Node.js",
		"Nest.js",
		"Prisma ORM",
	];

	return (
		<>
			<AboutSection />

			<section id="projects" className="scroll-mt-32 pt-24">
				<ProjectSection />
			</section>

			<section id="experience" className="section-shell scroll-mt-32 pt-24">
				<SectionIntro
					badge={t("experience")}
					title={t("experience")}
					description={t("experience-description")}
				/>
				<TabExperience />
			</section>

			<section id="formation" className="section-shell scroll-mt-32 pt-24">
				<SectionIntro
					badge={t("formation")}
					title={t("formation")}
					description={t("formation-description")}
				/>
				<TabFormation />
			</section>

			<section id="about" className="section-shell scroll-mt-32 pt-24">
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
					className="glass-panel rounded-[32px] p-8 sm:p-10 lg:p-12"
				>
					<div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
						<div>
							<span className="section-kicker">{t("about")}</span>
							<h2 className="mt-6 max-w-3xl text-4xl font-black uppercase tracking-[-0.01em] text-[var(--page-text)] sm:text-5xl">
								{t("about-title")}
							</h2>
							<p className="mt-6 max-w-3xl text-base leading-8 text-[var(--page-muted)] sm:text-lg">
								{t("about-text")}
							</p>
						</div>

						<div className="rounded-[28px] border border-[var(--page-border)] bg-[var(--page-panel-strong)] p-6">
							<p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--page-muted)]">
								{t("about-stack-label")}
							</p>
							<div className="mt-4 flex flex-wrap gap-2">
								{aboutStack.map((item) => (
									<span key={item} className="project-chip">
										{item}
									</span>
								))}
							</div>
						</div>
					</div>
				</motion.div>
			</section>

			<section
				id="contact"
				className="section-shell scroll-mt-32 pb-10 pt-24 sm:pb-16"
			>
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
					className="glass-panel rounded-[32px] p-8 sm:p-10 lg:p-12"
				>
					<div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_360px] lg:items-end">
						<div>
							<span className="section-kicker">{t("contact-kicker")}</span>
							<h2 className="mt-6 max-w-2xl text-4xl font-black uppercase tracking-[-0.01em] text-[var(--page-text)] sm:text-5xl">
								{t("contact-title")}
							</h2>
							<p className="mt-5 max-w-2xl text-base leading-8 text-[var(--page-muted)] sm:text-lg">
								{t("contact-description")}
							</p>
						</div>

						<div className="flex flex-col gap-3">
							<a href="mailto:levigleik@gmail.com" className="action-primary">
								<FaEnvelope size={16} />
								{t("send-email")}
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
						</div>
					</div>
				</motion.div>
			</section>
		</>
	);
}
