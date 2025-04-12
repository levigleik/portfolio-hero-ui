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
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { Image } from "@heroui/image";
import { Link } from "@heroui/link";
import Autoplay from "embla-carousel-autoplay";
import { useTranslations } from "next-intl";
import { FaGithub } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";

export default function ProjectSection() {
	const t = useTranslations("Projects");
	return (
		<>
			<div className="mb-2 flex w-full justify-between gap-2">
				<span className="font-calistoga text-3xl tracking-widest">
					{t("projects")}
				</span>
				<Button
					variant="light"
					className="font-sans text-xl italic transition-all duration-300 ease-in"
					radius="full"
					as={Link}
					href="/projects"
				>
					{t("view-more")}
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
						<CarouselItem key={project.name} className="md:basis-1/2">
							<Card
								className="py-4 bg-primary-50/20 flex flex-col h-full"
								shadow="sm"
							>
								<CardHeader className="flex-col items-start md:h-[150px]">
									<h1 className="font-bold text-lg mb-4">
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
										width={600}
										className="object-contain transition-all duration-300 ease-in hover:scale-105 rounded-xl"
										loading="lazy"
										isZoomed
									/>
									<div className="flex flex-wrap gap-2 mt-4">
										{PROJECT_TECHONOLOGIES[index].techonologies.map((tech) => (
											<Chip key={tech} className="font-semibold text-sm">
												{tech}
											</Chip>
										))}
									</div>
								</CardBody>
								<Divider className="my-2" />
								<CardFooter className="gap-4">
									{PROJECT_TECHONOLOGIES[index].git && (
										<Button
											radius="full"
											as={Link}
											href={PROJECT_TECHONOLOGIES[index].git}
											isExternal
											// color="primary"
										>
											<FaGithub /> Git
										</Button>
									)}
									{PROJECT_TECHONOLOGIES[index].url && (
										<Button
											radius="full"
											as={Link}
											href={PROJECT_TECHONOLOGIES[index].url}
											isExternal
											color="primary"
										>
											<TbWorld /> Site
										</Button>
									)}
								</CardFooter>
							</Card>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="hidden lg:flex" />
				<CarouselNext className="hidden lg:flex" />
			</Carousel>
		</>
	);
}
