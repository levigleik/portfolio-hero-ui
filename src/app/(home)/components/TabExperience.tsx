"use client";

import { Reveal } from "@/components/motion/ScrollScene";
import { useTranslations } from "next-intl";

export default function TabExperience() {
	const t = useTranslations("TabExperience");
	return (
		<div className="career-list">
			{["infarma", "macedo-soft-house", "greendot"].map((item, index) => (
				<Reveal key={item} className="career-row">
					<span className="career-order">0{index + 1}</span>
					<div className="career-company">
						<p className="career-date">{t(`${item}.date`)}</p>
						<h3>{t(`${item}.title`)}</h3>
						<p className="career-role">{t(`${item}.subtitle`)}</p>
					</div>
					<ul>
						{Object.values(
							t.raw(`${item}.responsibilities`) as Record<string, string>,
						).map((text) => (
							<li key={text}>{text}</li>
						))}
					</ul>
				</Reveal>
			))}
		</div>
	);
}
