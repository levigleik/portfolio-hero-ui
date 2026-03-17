"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const formationItems = ["farias-brito", "icaro"] as const;

export default function TabFormation() {
	const t = useTranslations("TabFormation");

	return (
		<div className="grid gap-6 lg:grid-cols-2">
			{formationItems.map((item, index) => {
				const responsibilities = t.raw(`${item}.responsibilities`) as Record<
					string,
					string
				>;

				return (
					<motion.article
						key={item}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.2 }}
						transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
						className="glass-panel rounded-[30px] p-6 sm:p-8"
					>
						<span className="font-mono text-xs font-semibold uppercase tracking-[0.32em] text-[var(--brand)]">
							{t(`${item}.date`)}
						</span>

						<h3 className="mt-5 text-2xl font-semibold tracking-tight text-[var(--page-text)]">
							{t(`${item}.title`)}
						</h3>
						<p className="mt-2 text-sm font-medium uppercase tracking-[0.24em] text-[var(--page-muted)]">
							{t(`${item}.subtitle`)}
						</p>

						<ul className="mt-6 space-y-3 text-sm leading-7 text-[var(--page-muted)]">
							{Object.values(responsibilities).map((responsibility) => (
								<li key={responsibility} className="flex items-start gap-3">
									<span className="mt-2 h-2 w-2 rounded-full bg-[var(--brand)]" />
									<span>{responsibility}</span>
								</li>
							))}
						</ul>
					</motion.article>
				);
			})}
		</div>
	);
}
