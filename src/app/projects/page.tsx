import ProjectCard from "@/components/project/ProjectCard";
import { PROJECT_TECHONOLOGIES } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Projetos",
};

export default function HomePage() {
	return (
		<div className="mt-4 grid grid-cols-1 items-center justify-center gap-4 font-sans md:grid-cols-2 lg:grid-cols-3 lg:mt-10">
			{PROJECT_TECHONOLOGIES.map((project) => (
				<ProjectCard
					title={`project-${project.name}.title`}
					description={`project-${project.name}.description`}
					{...project}
					key={project.name}
				/>
			))}
		</div>
	);
}
