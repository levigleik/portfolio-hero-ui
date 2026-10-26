"use client";

import { Reveal } from "@/components/motion/ScrollScene";
import ResumeLink from "@/components/ResumeLink";
import { MotionConfig } from "framer-motion";
import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import AboutSection from "./AboutSection";
import ContactForm from "./ContactForm";
import Manifesto from "./Manifesto";
import ProjectShowcase from "./ProjectShowcase";
import StackSection from "./StackSection";
import TabExperience from "./TabExperience";
import TabFormation from "./TabFormation";

export default function HomeComp() {
	const t = useTranslations("HomePage");
	const n = useTranslations("Narrative");
	const locale = useLocale();
	return (
		<MotionConfig reducedMotion="user">
			<AboutSection />
			<Manifesto />
			<ProjectShowcase />
			<StackSection />
			<section id="experience" className="career-section section-shell">
				<Reveal className="career-heading">
					<div className="career-heading-actions">
						<p className="eyebrow">
							<span className="chapter-number">03 /</span>
							{t("experience")}
						</p>
						<ResumeLink />
					</div>
					<h2 className="section-title">{n("experience-title")}</h2>
				</Reveal>
				<TabExperience />
			</section>
			<section id="formation" className="education-section">
				<div className="section-shell">
					<Reveal>
						<p className="eyebrow">
							<span className="chapter-number">04 /</span>
							{t("formation")}
						</p>
						<h2 className="section-title">{n("formation-title")}</h2>
					</Reveal>
					<TabFormation />
				</div>
			</section>
			<section id="contact" className="contact-section" aria-label={t("contact-kicker")}>
				<div className="section-shell">
					<div className="contact-layout">
						<Reveal className="contact-form-reveal">
							<ContactForm />
						</Reveal>
					</div>
					<footer className="site-footer">
						<a className="footer-brand" href="#hero">
							levi<span>gleik.</span>
						</a>
						<span>{n("footer")}</span>
						<div>
							<a
								href="https://github.com/levigleik"
								target="_blank"
								rel="noreferrer"
							>
								<Github size={17} />
								GitHub
							</a>
							<a
								href="https://linkedin.com/in/levi-gleik"
								target="_blank"
								rel="noreferrer"
							>
								<Linkedin size={17} />
								LinkedIn
							</a>
							<a
								href={
									locale === "pt-BR" ? "/resume-pt-BR.pdf" : "/resume-en.pdf"
								}
								target="_blank"
								rel="noreferrer"
							>
								{t("resume")}
								<ArrowUpRight size={16} />
							</a>
						</div>
					</footer>
				</div>
			</section>
		</MotionConfig>
	);
}
