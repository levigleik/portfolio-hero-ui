"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

/** Pin scenes only where there is enough room to read them comfortably. */
export function usePinnedScene() {
	const [enabled, setEnabled] = useState(false);
	useEffect(() => {
		const query = window.matchMedia(
			"(min-width: 1000px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)",
		);
		const update = () => setEnabled(query.matches);
		update();
		query.addEventListener("change", update);
		return () => query.removeEventListener("change", update);
	}, []);
	return enabled;
}

export function Reveal({
	children,
	className = "",
	delay = 0,
}: {
	children: ReactNode;
	className?: string;
	delay?: number;
}) {
	const reducedMotion = useReducedMotion();
	return (
		<motion.div
			className={className}
			initial={reducedMotion ? false : { opacity: 0, y: 28 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.15 }}
			transition={{
				duration: reducedMotion ? 0 : 0.7,
				delay,
				ease: [0.22, 1, 0.36, 1],
			}}
		>
			{children}
		</motion.div>
	);
}
