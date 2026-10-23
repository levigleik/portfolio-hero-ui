"use client";

import { Reveal } from "@/components/motion/ScrollScene";
import { MotionConfig } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, MoveUpRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import AboutSection from "./AboutSection";
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
					<p className="eyebrow">
						<span className="chapter-number">03 /</span>
						{t("experience")}
					</p>
					<h2 className="section-title">
						{n("experience-title-1")}
						<br />
						<span className="muted-heading">{n("experience-title-2")}</span>
					</h2>
					<p className="section-description">{t("experience-description")}</p>
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
			<section id="contact" className="contact-section">
				<div className="section-shell">
					<Reveal>
						<p className="eyebrow">
							<span className="chapter-number">05 /</span>
							{t("contact-kicker")}
						</p>
						<div className="contact-main">
							<h2>
								{n("contact-title-1")}
								<br />
								{n("contact-title-2")}
							</h2>
							<a
								className="contact-arrow"
								href="mailto:levigleik@gmail.com"
								aria-label={t("send-email")}
							>
								<MoveUpRight strokeWidth={1.2} />
							</a>
						</div>
						<div className="contact-details">
							<a href="mailto:levigleik@gmail.com" className="contact-email">
								levigleik@gmail.com
								<ArrowUpRight size={24} />
							</a>
							<p>{t("contact-description")}</p>
						</div>
					</Reveal>
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
