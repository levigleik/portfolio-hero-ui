"use client";

import { usePinnedScene } from "@/components/motion/ScrollScene";
import { PROJECT_TECHONOLOGIES } from "@/lib/constants";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Braces } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import ProjectScreen from "./ProjectScreen";

export default function AboutSection() {
	const t = useTranslations("Narrative");
	const home = useTranslations("HomePage");
	const section = useRef<HTMLElement>(null);
	const pinned = usePinnedScene();
	const { scrollYProgress } = useScroll({
		target: section,
		offset: ["start start", "end end"],
	});
	const titleY = useTransform(scrollYProgress, [0, 1], [0, -90]);
	const titleOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.4, 0]);
	const screenY = useTransform(scrollYProgress, [0, 1], [0, -100]);
	const screenScale = useTransform(scrollYProgress, [0, 1], [1, 1.13]);
	const rotate = useTransform(scrollYProgress, [0, 1], [-7, 0]);
	const satelliteY = useTransform(scrollYProgress, [0, 1], [0, -180]);
	const clinic = PROJECT_TECHONOLOGIES[0];
	const meetings = PROJECT_TECHONOLOGIES[2];

	return (
		<section
			id="hero"
			ref={section}
			className={`hero-story ${pinned ? "is-pinned" : ""}`}
		>
			<div className="hero-sticky">
				<div className="hero-stage">
					<motion.div
						className="hero-copy"
						style={pinned ? { y: titleY, opacity: titleOpacity } : undefined}
					>
						<p className="eyebrow hero-eyebrow">
							<span className="status-dot" />
							Levi Gleik <span className="eyebrow-divider">/</span>{" "}
							{home("full-stack-developer")}
						</p>
						<h1>
							{t("hero-line-1")}
							<br />
							<span>{t("hero-line-2")}</span>
						</h1>
						<p className="hero-subtitle">{t("hero-subtitle")}</p>
						<a href="#projects" className="button-blue">
							{home("explore-projects")}
							<ArrowUpRight size={18} />
						</a>
					</motion.div>

					<div className="hero-visual" aria-label={t("project-preview")}>
						<div className="hero-orbit orbit-one" />
						<div className="hero-orbit orbit-two" />
						<motion.div
							className="hero-main-screen"
							style={
								pinned
									? { y: screenY, scale: screenScale, rotateX: rotate }
									: undefined
							}
						>
							<ProjectScreen
								src={clinic.photo}
								title="Gestão Clínica"
								address="novogestaoclinica.netlify.app"
								priority
							/>
						</motion.div>
						<motion.div
							className="hero-satellite"
							style={pinned ? { y: satelliteY } : undefined}
						>
							<ProjectScreen
								src={meetings.photo}
								title="Sistema de reuniões"
								address="atasreunioes.com"
								priority
							/>
						</motion.div>
						<div className="code-token" aria-hidden="true">
							<Braces strokeWidth={1.5} />
						</div>
						<div className="hero-tech-label" aria-hidden="true">
							<span className="status-dot" />
							React · Next.js · Node.js
						</div>
					</div>
					<div className="hero-caption">
						<span>{t("hero-caption")}</span>
						<a href="#about">
							{t("scroll")}
							<ArrowDown size={16} />
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
