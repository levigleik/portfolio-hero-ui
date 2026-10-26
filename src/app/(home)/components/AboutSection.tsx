"use client";

import { usePinnedScene } from "@/components/motion/ScrollScene";
import ResumeLink from "@/components/ResumeLink";
import { PROJECT_TECHONOLOGIES } from "@/lib/constants";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Braces } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import ProjectScreen from "./ProjectScreen";

export default function AboutSection() {
	const t = useTranslations("Narrative");
	const home = useTranslations("HomePage");
	const projects = useTranslations("Projects");
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
	const clinic = PROJECT_TECHONOLOGIES.find((project) => project.name === "gestao-clinica")!;
	const ecommerce = PROJECT_TECHONOLOGIES.find((project) => project.name === "ecommerce")!;

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
							Levi Gleik
						</p>
						<h1>{home("full-stack-developer")}</h1>
						<div className="hero-actions mt-4">
							<a href="#projects" className="button-blue">
								{home("explore-projects")}
								<ArrowUpRight size={18} />
							</a>
							<ResumeLink />
						</div>
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
								title={projects("project-gestao-clinica.title")}
								address="novogestaoclinica.netlify.app"
								priority
							/>
						</motion.div>
						<motion.div
							className="hero-satellite"
							style={pinned ? { y: satelliteY } : undefined}
						>
							<ProjectScreen
								src={ecommerce.photo}
								title={projects("project-ecommerce.title")}
								address={projects("project-ecommerce.title")}
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
