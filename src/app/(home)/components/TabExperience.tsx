"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const experienceItems = ["macedo-soft-house", "greendot"] as const;

export default function TabExperience() {
	const t = useTranslations("TabExperience");

	return (
		<div className="relative mx-auto max-w-5xl">
			<div className="absolute left-4 top-0 hidden h-full w-px timeline-line md:left-1/2 md:block md:-translate-x-1/2" />

			<div className="flex flex-col gap-8 md:gap-14">
				{experienceItems.map((item, index) => {
					const isReversed = index % 2 === 1;
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
							transition={{ duration: 0.5, ease: "easeOut" }}
							className={`relative md:flex md:items-start ${
								isReversed ? "md:flex-row-reverse" : ""
							}`}
						>
							<div
								className={`hidden md:block md:w-1/2 ${
									isReversed ? "md:pl-16" : "md:pr-16 md:text-right"
								}`}
							>
								<span className="font-mono text-xs font-semibold uppercase tracking-[0.32em] text-[var(--brand)]">
									{t(`${item}.date`)}
								</span>
							</div>

							<div className="absolute left-0 top-8 hidden h-4 w-4 rounded-full border border-[var(--page-border-strong)] bg-[var(--brand)] shadow-[0_0_18px_rgba(103,232,249,0.45)] md:left-1/2 md:block md:-translate-x-1/2" />

							<div className="md:w-1/2 md:px-16">
								<div className="glass-panel rounded-[28px] p-6 sm:p-8">
									<span className="font-mono text-xs font-semibold uppercase tracking-[0.32em] text-[var(--brand)] md:hidden">
										{t(`${item}.date`)}
									</span>

									<h3 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--page-text)]">
										{t(`${item}.title`)}
									</h3>
									<p className="mt-2 text-sm font-medium uppercase tracking-[0.24em] text-[var(--page-muted)]">
										{t(`${item}.subtitle`)}
									</p>

									<ul className="mt-5 space-y-3 text-sm leading-7 text-[var(--page-muted)]">
										{Object.values(responsibilities).map((responsibility) => (
											<li
												key={responsibility}
												className="flex items-start gap-3"
											>
												<span className="mt-2 h-2 w-2 rounded-full bg-[var(--brand)]" />
												<span>{responsibility}</span>
											</li>
										))}
									</ul>
								</div>
							</div>
						</motion.article>
					);
				})}
			</div>
		</div>
	);
}
