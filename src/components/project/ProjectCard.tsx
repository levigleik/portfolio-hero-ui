"use client";
import { PROJECT_TECHONOLOGIES } from "@/lib/constants";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import { useTranslations } from "next-intl";
import { FaGithub } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import Image from "../ui/image";

type ProjectCardProps = (typeof PROJECT_TECHONOLOGIES)[number] & {
	title: string;
	description: string;
	// key?: string
};

export default function ProjectCard(project: ProjectCardProps) {
	const t = useTranslations("Projects");
	return (
		<Card className="py-4 bg-primary-50/20 flex flex-col h-full" shadow="sm">
			<CardHeader className="flex-col items-start md:h-[150px]">
				<h1 className="font-bold text-lg mb-4">{t(project.title)}</h1>
				<small className="text-default-500">{t(project.description)}</small>
			</CardHeader>
			<CardBody className="overflow-visible py-2">
				<Image
					src={project.photo}
					alt={project.name}
					width={600}
					className="object-contain transition-all duration-300 ease-in hover:scale-105 rounded-xl"
					loading="lazy"
					isZoomed
				/>
				<div className="flex flex-wrap gap-2 mt-4">
					{project.techonologies.map((tech) => (
						<Chip key={tech} className="font-semibold text-sm">
							{tech}
						</Chip>
					))}
				</div>
			</CardBody>
			{(project.git || project.url) && (
				<>
					<Divider className="my-2" />

					<CardFooter className="gap-4">
						{project.git && (
							<Button radius="full" as={Link} href={project.git} isExternal>
								<FaGithub /> Git
							</Button>
						)}
						{project.url && (
							<Button
								radius="full"
								as={Link}
								href={project.url}
								isExternal
								color="primary"
							>
								<TbWorld /> Site
							</Button>
						)}
					</CardFooter>
				</>
			)}
		</Card>
	);
}
