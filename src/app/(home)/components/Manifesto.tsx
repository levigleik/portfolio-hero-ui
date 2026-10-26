"use client";

import { usePinnedScene } from "@/components/motion/ScrollScene";
import ScrollTypewriter from "@/components/motion/ScrollTypewriter";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, Braces } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef } from "react";

export default function Manifesto() {
	const t = useTranslations("Narrative");
	const home = useTranslations("HomePage");
	const target = useRef<HTMLElement>(null);
	const pinned = usePinnedScene();
	const { scrollYProgress } = useScroll({
		target,
		offset: ["start 76px", "end end"],
	});
	const typing = useTransform(scrollYProgress, [0.08, 0.82], [0, 1]);
	const scale = useTransform(scrollYProgress, [0, 0.85, 1], [1.12, 0.84, 0.84]);
	const y = useTransform(scrollYProgress, [0, 0.85, 1], [38, -16, -16]);
	const tokenY = useTransform(scrollYProgress, [0, 1], [-30, 140]);
	const tokenRotate = useTransform(scrollYProgress, [0, 1], [-18, 8]);
	const tokenOpacity = useTransform(
		scrollYProgress,
		[0, 0.72, 0.95],
		[1, 1, 0],
	);
	const tokenScale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
	const detailsOpacity = useTransform(scrollYProgress, [0.76, 0.97], [0, 1]);
	const detailsY = useTransform(scrollYProgress, [0.76, 0.97], [24, 0]);

	return (
		<section
			id="about"
			ref={target}
			className={`manifesto-story ${pinned ? "is-pinned" : ""}`}
		>
			<div className="manifesto-sticky section-shell">
				<p className="eyebrow">
					<span className="chapter-number">01 /</span>
					{home("about")}
				</p>
				<div className="manifesto-typing-scene">
					<motion.h2
						className="manifesto-text"
						aria-label={t("statement")}
						style={pinned ? { scale, y } : undefined}
					>
						<ScrollTypewriter
							text={t("statement")}
							progress={typing}
							enabled={pinned}
						/>
					</motion.h2>
					<motion.div
						className="manifesto-code-token"
						aria-hidden="true"
						style={
							pinned
								? {
										y: tokenY,
										rotate: tokenRotate,
										scale: tokenScale,
										opacity: tokenOpacity,
									}
								: undefined
						}
					>
						<Braces strokeWidth={1.3} />
					</motion.div>
				</div>
				<motion.div
					className="manifesto-bottom"
					style={pinned ? { opacity: detailsOpacity, y: detailsY } : undefined}
				>
					<ArrowDownRight className="manifesto-arrow" strokeWidth={1} />
					<p>{home("about-text")}</p>
				</motion.div>
			</div>
		</section>
	);
}
