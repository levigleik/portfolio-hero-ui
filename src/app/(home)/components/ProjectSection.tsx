"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { PROJECT_TECHONOLOGIES } from "@/lib/constants";
import Autoplay from "embla-carousel-autoplay";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function ProjectSection() {
	const t = useTranslations("Projects");
	return (
		<>
			<div className="mb-2 flex w-full justify-between gap-2">
				<span className="font-calistoga text-3xl tracking-widest">
					Projects
				</span>
				<Button
					variant="link"
					className="font-sans text-xl italic transition-all duration-300 ease-in"
				>
					ver mais
				</Button>
			</div>
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
				className="w-full"
			>
				<CarouselContent>
					{PROJECT_TECHONOLOGIES.map((project, index) => (
						<CarouselItem
							key={project.name}
							className="md:basis-1/2 lg:basis-1/2"
						>
							<div className="p-1">
								<Card>
									<CardContent className="flex flex-col items-center p-6">
										<Image
											src={PROJECT_TECHONOLOGIES[index].photo}
											alt={PROJECT_TECHONOLOGIES[index].name}
											width={800}
											height={800}
											className="mb-4 aspect-square w-full object-contain transition-all duration-300 ease-in hover:scale-105"
											loading="lazy"
										/>
										<span className="mb-2 font-semibold text-xl">
											{t(`project-${index + 1}.title`)}
										</span>
										<p className="mb-4 text-center text-gray-600 text-sm">
											{t(`project-${index + 1}.description`)}
										</p>
										<div className="flex flex-wrap gap-2">
											{PROJECT_TECHONOLOGIES[index].techonologies.map(
												(tech) => (
													<Badge key={tech} className="font-semibold text-sm">
														{tech}
													</Badge>
												),
											)}
										</div>
									</CardContent>
								</Card>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</>
	);
}
