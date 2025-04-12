"use client";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { PROJECT_TECHONOLOGIES } from "@/lib/constants";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Image } from "@heroui/image";
import Autoplay from "embla-carousel-autoplay";
import { useTranslations } from "next-intl";

export default function ProjectSection() {
	const t = useTranslations("Projects");
	return (
		<>
			<div className="mb-2 flex w-full justify-between gap-2">
				<span className="font-calistoga text-3xl tracking-widest">
					Projects
				</span>
				<Button
					variant="light"
					className="font-sans text-xl italic transition-all duration-300 ease-in"
					radius="full"
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
				className="w-full [&>div]:p-3"
			>
				<CarouselContent>
					{PROJECT_TECHONOLOGIES.map((project, index) => (
						<CarouselItem
							key={project.name}
							className="md:basis-1/2 lg:basis-1/2"
						>
							<Card className="py-4 bg-primary-50/20" shadow="sm">
								<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
									<h1 className="font-bold text-lg">
										{t(`project-${index + 1}.title`)}
									</h1>
									<small className="text-default-500">
										{t(`project-${index + 1}.description`)}
									</small>
								</CardHeader>
								<CardBody className="overflow-visible py-2">
									<Image
										src={PROJECT_TECHONOLOGIES[index].photo}
										alt={PROJECT_TECHONOLOGIES[index].name}
										width={1000}
										className="aspect-square w-full object-contain transition-all duration-300 ease-in hover:scale-105"
										loading="lazy"
										isZoomed
									/>
									<div className="flex flex-wrap gap-2">
										{PROJECT_TECHONOLOGIES[index].techonologies.map((tech) => (
											<Chip key={tech} className="font-semibold text-sm">
												{tech}
											</Chip>
										))}
									</div>
								</CardBody>
							</Card>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</>
	);
}
