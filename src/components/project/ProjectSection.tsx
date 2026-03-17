import { PROJECT_TECHONOLOGIES } from "@/lib/constants";
import ProjectCard from "./ProjectCard";
import ProjectHeader from "./ProjectHeader";
import {useIsMobile} from "@/hooks/useIsMobile";

export default function ProjectSection() {

	const isMobile = useIsMobile();
	const projectsSlice = isMobile ? PROJECT_TECHONOLOGIES.slice(0,3) : PROJECT_TECHONOLOGIES.slice(0,6);
	return (
		<div className="section-shell">
			<ProjectHeader />
			<div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
				{projectsSlice.map((project) => (
					<ProjectCard key={project.name} {...project} />
				))}
			</div>
		</div>
	);
}
