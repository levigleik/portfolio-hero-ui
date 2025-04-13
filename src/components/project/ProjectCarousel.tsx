import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { PROJECT_TECHONOLOGIES } from "@/lib/constants";
import Autoplay from "embla-carousel-autoplay";
import ProjectCard from "./ProjectCard";

export default function ProjectCarousel() {
	return (
		<Carousel
			opts={{
				align: "start",
				loop: true,
			}}
			plugins={[
				Autoplay({
					delay: 3000,
				}),
			]}
			className="w-full [&>div]:p-3"
		>
			<CarouselContent>
				{PROJECT_TECHONOLOGIES.map((project) => (
					<CarouselItem key={project.name} className="md:basis-1/3">
						<ProjectCard
							title={`project-${project.name}.title`}
							description={`project-${project.name}.description`}
							{...project}
						/>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className="hidden lg:flex" />
			<CarouselNext className="hidden lg:flex" />
		</Carousel>
	);
}
