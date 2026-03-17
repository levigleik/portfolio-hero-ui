import ProjectCard from "@/components/project/ProjectCard";
import { PROJECT_TECHONOLOGIES } from "@/lib/constants";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function ProjectsPage() {
	const t = await getTranslations("Projects");

	return (
		<div className="section-shell pt-32 sm:pt-36">
			<section className="glass-panel rounded-[34px] p-8 sm:p-10 lg:p-12">
				<span className="section-kicker">{t("archive-badge")}</span>

				<div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
					<div className="max-w-3xl">
						<h1 className="text-4xl font-black uppercase tracking-[-0.06em] text-[var(--page-text)] sm:text-5xl lg:text-6xl">
							{t("archive-title")}
						</h1>
						<p className="mt-5 text-base leading-8 text-[var(--page-muted)] sm:text-lg">
							{t("archive-description")}
						</p>
					</div>

					<Link href="/" className="action-secondary w-fit">
						{t("back-home")}
					</Link>
				</div>
			</section>

			<section className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
				{PROJECT_TECHONOLOGIES.map((project) => (
					<ProjectCard key={project.name} {...project} />
				))}
			</section>
		</div>
	);
}
