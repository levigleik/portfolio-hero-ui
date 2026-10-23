"use client";

import { Reveal, usePinnedScene } from "@/components/motion/ScrollScene";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, Braces } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef } from "react";

export default function StackSection() {
	const t = useTranslations("Narrative");
	const home = useTranslations("HomePage");
	const target = useRef<HTMLElement>(null);
	const animated = usePinnedScene();
	const { scrollYProgress } = useScroll({
		target,
		offset: ["start end", "end start"],
	});
	const x = useTransform(scrollYProgress, [0, 1], [100, -100]);
	const reverseX = useTransform(scrollYProgress, [0, 1], [-100, 100]);
	return (
		<section
			className="stack-section"
			ref={target}
			aria-labelledby="stack-title"
		>
			<div className="section-shell">
				<Reveal>
					<p className="eyebrow">
						<Braces size={19} />
						{home("about-stack-label")}
					</p>
					<h2 id="stack-title">
						{t("stack-title-1")}
						<br />
						<span>{t("stack-title-2")}</span>
					</h2>
				</Reveal>
				<div
					className="stack-lines"
					aria-label="React, Next.js, TypeScript, Node.js, NestJS, Prisma, PostgreSQL, REST APIs"
				>
					<motion.div style={animated ? { x } : undefined} aria-hidden="true">
						<span>React</span>
						<span>Next.js</span>
						<span>TypeScript</span>
					</motion.div>
					<motion.div
						style={animated ? { x: reverseX } : undefined}
						aria-hidden="true"
					>
						<span>Node.js</span>
						<span>NestJS</span>
						<span>Prisma</span>
					</motion.div>
				</div>
				<Reveal className="stack-bottom">
					<ArrowDownRight strokeWidth={1} />
					<p>{t("stack-description")}</p>
					<span className="stack-footnote">{t("stack-footnote")}</span>
				</Reveal>
			</div>
		</section>
	);
}
