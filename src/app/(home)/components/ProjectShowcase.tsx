"use client";

import { usePinnedScene } from "@/components/motion/ScrollScene";
import { Image as ZoomableImage } from "@/components/ui/image";
import { PROJECT_TECHONOLOGIES } from "@/lib/constants";
import {
	motion,
	useMotionValueEvent,
	useScroll,
	useTransform,
	type MotionValue,
} from "framer-motion";
import { ArrowRight, ArrowUpRight, Github } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRef, useState, type CSSProperties } from "react";
import ProjectScreen from "./ProjectScreen";

const featuredNames = ["ecommerce", "viu-ganhou", "reunioes", "dlav"];
const featured = featuredNames.map(
	(name) => PROJECT_TECHONOLOGIES.find((project) => project.name === name)!,
);

function ProjectSlide({
	project,
	index,
	active,
	pinned,
	progress,
}: {
	project: (typeof featured)[number];
	index: number;
	active: number;
	pinned: boolean;
	progress: MotionValue<number>;
}) {
	const t = useTranslations("Projects");
	const n = useTranslations("Narrative");
	const start = index / featured.length;
	const end = (index + 1) / featured.length;
	const opacity = useTransform(
		progress,
		[start - 0.055, start + 0.025, end - 0.055, end + 0.025],
		[0, 1, 1, 0],
	);
	const y = useTransform(
		progress,
		[start - 0.055, start + 0.025, end - 0.055, end + 0.025],
		[45, 0, 0, -45],
	);
	const rotate = useTransform(progress, [start, end], [2, -2]);
	const firstOpacity = useTransform(
		progress,
		[0, end - 0.055, end + 0.025],
		[1, 1, 0],
	);
	const lastOpacity = useTransform(
		progress,
		[start - 0.055, start + 0.025, 1],
		[0, 1, 1],
	);
	const lastY = useTransform(
		progress,
		[start - 0.055, start + 0.025, 1],
		[45, 0, 0],
	);
	const visibleOpacity =
		index === 0
			? firstOpacity
			: index === featured.length - 1
				? lastOpacity
				: opacity;
	const title = t(`project-${project.name}.title`);
	const address = project.url
		? new URL(project.url).hostname
		: project.git
			? new URL(project.git).hostname
			: title;

	return (
		<motion.article
			className={`project-slide project-tone-${index} ${project.mobilePhoto ? "project-with-mobile" : ""}`}
			aria-hidden={pinned && active !== index ? true : undefined}
			inert={pinned && active !== index ? true : undefined}
			style={
				pinned
					? {
							opacity: visibleOpacity,
							y: index === featured.length - 1 ? lastY : y,
							pointerEvents: active === index ? "auto" : "none",
						}
					: undefined
			}
		>
			<div className="project-story-copy">
				<span className="project-index">
					0{index + 1}
					<span>/ {String(featured.length).padStart(2, "0")}</span>
				</span>
				<p className="eyebrow project-category">
					{n(`project-category-${index}`)}
				</p>
				<h3>{title}</h3>
				<p className="project-description">
					{t(`project-${project.name}.description`)}
				</p>
				<div className="project-technologies">
					{project.techonologies.slice(0, 5).map((tech) => (
						<span key={tech}>{tech}</span>
					))}
				</div>
				<div className="project-links">
					{project.url && (
						<a
							className="button-blue project-visit-link"
							href={project.url}
							target="_blank"
							rel="noreferrer"
						>
							{t("live-site")}
							<ArrowUpRight size={18} />
						</a>
					)}
					{project.git && (
						<a
							className="text-link secondary-link"
							href={project.git}
							target="_blank"
							rel="noreferrer"
						>
							<Github size={17} />
							{t("repository")}
						</a>
					)}
				</div>
			</div>
			<div className="project-story-visual">
				<div className="project-visual-label" aria-hidden="true">
					<span className="status-dot" />
					{n(`project-category-${index}`)}
					<span className="project-visual-number">0{index + 1}</span>
				</div>
				<motion.div
					className="project-floating-screen"
					style={pinned ? { rotateZ: rotate } : undefined}
				>
					<ProjectScreen
						src={project.photo}
						title={title}
						address={address}
						zoomable
					/>
				</motion.div>
				{project.mobilePhoto && (
					<div className="project-mobile-screen">
						<ZoomableImage
							src={project.mobilePhoto}
							alt={n("project-mobile-preview", { title })}
							width={390}
							height={844}
							sizes="(max-width: 760px) 25vw, 150px"
						/>
					</div>
				)}
			</div>
		</motion.article>
	);
}

function Progress({
	progress,
	index,
}: {
	progress: MotionValue<number>;
	index: number;
}) {
	const scaleX = useTransform(progress, [index / featured.length, (index + 1) / featured.length], [0, 1]);
	return <motion.span className="project-tab-progress" style={{ scaleX }} />;
}

export default function ProjectShowcase() {
	const t = useTranslations("Narrative");
	const projects = useTranslations("Projects");
	const target = useRef<HTMLElement>(null);
	const pinned = usePinnedScene();
	const [active, setActive] = useState(0);
	const { scrollYProgress } = useScroll({
		target,
		offset: ["start 76px", "end end"],
	});
	useMotionValueEvent(scrollYProgress, "change", (value) =>
		setActive(Math.min(featured.length - 1, Math.floor(value * featured.length))),
	);

	function goToProject(index: number) {
		if (!target.current) return;
		const top =
			target.current.getBoundingClientRect().top + window.scrollY - 76;
		const distance = target.current.offsetHeight - window.innerHeight + 76;
		window.scrollTo({
			top: top + distance * ((index + 0.4) / featured.length),
			behavior: "smooth",
		});
	}

	return (
		<section
			id="projects"
			ref={target}
			className={`projects-story ${pinned ? "is-pinned" : ""}`}
			style={{ "--project-count": featured.length } as CSSProperties}
		>
			<div className="projects-sticky section-shell">
				<div className="section-heading-row">
					<div>
						<p className="eyebrow">
							<span className="chapter-number">02 /</span>
							{projects("featured-tag")}
						</p>
						<h2 className="section-title">{t("projects-title")}</h2>
					</div>
					<Link className="text-link archive-link" href="/projects">
						{projects("view-all-projects")}
						<ArrowUpRight size={19} />
					</Link>
				</div>
				<div className="project-slides">
					{featured.map((project, index) => (
						<ProjectSlide
							key={project.name}
							project={project}
							index={index}
							active={active}
							pinned={pinned}
							progress={scrollYProgress}
						/>
					))}
				</div>
				{pinned && (
					<nav className="project-tabs" aria-label={projects("featured-tag")}>
						{featured.map((project, index) => (
							<button
								key={project.name}
								type="button"
								className={active === index ? "is-active" : ""}
								onClick={() => goToProject(index)}
								aria-current={active === index ? "true" : undefined}
							>
								<span className="project-tab-label">
									<span>0{index + 1}</span>
									{projects(`project-${project.name}.title`)}
									<ArrowRight size={16} />
								</span>
								<Progress progress={scrollYProgress} index={index} />
							</button>
						))}
					</nav>
				)}
			</div>
		</section>
	);
}
