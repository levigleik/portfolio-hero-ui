import { PROJECT_TECHONOLOGIES } from "@/lib/constants";
import ProjectCard from "./ProjectCard";
import ProjectHeader from "./ProjectHeader";

export default function ProjectSection() {
	return (
		<div className="section-shell">
			<ProjectHeader />
			<div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
				{PROJECT_TECHONOLOGIES.slice(0, 6).map((project) => (
					<ProjectCard key={project.name} {...project} />
				))}
			</div>
		</div>
	);
}
