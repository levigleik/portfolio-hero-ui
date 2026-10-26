"use client";

import { PROJECT_TECHONOLOGIES } from "@/lib/constants";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { FaGithub } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import {Image} from "../ui/image";
import { cn } from "@heroui/theme";

type ProjectCardProps = (typeof PROJECT_TECHONOLOGIES)[number] & {
	className?: string;
};

export default function ProjectCard({
	className,
	git,
	name,
	photo,
	techonologies,
	url,
}: ProjectCardProps) {
	const t = useTranslations("Projects");
	const title = t(`project-${name}.title`);
	const description = t(`project-${name}.description`);

	return (
		<article
			className={clsx(
				"glass-panel group flex h-full flex-col rounded-[30px] p-4 sm:p-5",
				className,
			)}
		>
			<div className="relative overflow-hidden p-2">
				<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(103,232,249,0.16),transparent_68%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
				<Image
					src={photo}
					alt={title}
					width={1200}
					loading="lazy"
					className="aspect-[16/10] w-full rounded-[18px] object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
				/>
			</div>

			<div
				className={cn(
					"mt-5 flex flex-1 flex-col",
					(git || url) && "justify-between",
				)}
			>
				<span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-[var(--brand)]">
					{name.replace(/-/g, " / ")}
				</span>

				<h3 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--page-text)]">
					{title}
				</h3>

				<p className="mt-3 text-sm leading-7 text-[var(--page-muted)]">
					{description}
				</p>

				<div className="mt-5 flex flex-wrap gap-2">
					{techonologies.map((tech) => (
						<span key={tech} className="project-chip">
							{tech}
						</span>
					))}
				</div>

				{(git || url) && (
					<div className="mt-6 flex flex-wrap gap-3 border-t border-[var(--page-border)] pt-5">
						{git ? (
							<a
								href={git}
								target="_blank"
								rel="noreferrer"
								className="action-secondary"
							>
								<FaGithub size={16} />
								{t("repository")}
							</a>
						) : null}

						{url ? (
							<a
								href={url}
								target="_blank"
								rel="noreferrer"
								className="action-primary"
							>
								<TbWorld size={18} />
								{t("live-site")}
							</a>
						) : null}
					</div>
				)}
			</div>
		</article>
	);
}
