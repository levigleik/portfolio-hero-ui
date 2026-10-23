"use client";

import { Reveal } from "@/components/motion/ScrollScene";
import { GraduationCap } from "lucide-react";
import { useTranslations } from "next-intl";

export default function TabFormation() {
	const t = useTranslations("TabFormation");
	return (
		<div className="education-list">
			{["farias-brito", "icaro"].map((item) => (
				<Reveal className="education-item" key={item}>
					<GraduationCap size={28} strokeWidth={1.4} />
					<p className="career-date">{t(`${item}.date`)}</p>
					<h3>{t(`${item}.subtitle`)}</h3>
					<p>{t(`${item}.title`)}</p>
					<div className="education-subjects">
						{Object.values(
							t.raw(`${item}.responsibilities`) as Record<string, string>,
						).map((text) => (
							<span key={text}>{text}</span>
						))}
					</div>
				</Reveal>
			))}
		</div>
	);
}
