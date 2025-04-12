"use client";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { useTranslations } from "next-intl";

export default function ProjectHeader() {
	const t = useTranslations("Projects");
	return (
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
	);
}
