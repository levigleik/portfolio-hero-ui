"use client";
import { Card, CardBody } from "@heroui/card";
import { useTranslations } from "next-intl";

export default function TabFormation() {
	const t = useTranslations("TabFormation");
	return (
		<div className="flex flex-col gap-4 p-4">
			<Card className="gap-0 p-4 bg-primary-50/20" shadow="sm">
				<CardBody className="gap-1">
					<span className="text-muted-foreground text-sm">
						{t("farias-brito.date")}
					</span>
					<h3 className="font-bold text-2xl">{t("farias-brito.title")}</h3>
					<span className="mb-2 text-muted-foreground text-sm italic">
						{t("farias-brito.subtitle")}
					</span>
					<ul className="mt-2 list-inside list-disc text-muted-foreground text-sm space-y-2">
						<li>{t("farias-brito.responsibilities.1")}</li>
						<li>{t("farias-brito.responsibilities.2")}</li>
						<li>{t("farias-brito.responsibilities.3")}</li>
					</ul>
				</CardBody>
			</Card>
			<Card className="gap-0 p-4 bg-primary-50/20" shadow="sm">
				<CardBody className="gap-1">
					<span className="text-muted-foreground text-sm">
						{t("icaro.date")}
					</span>
					<h3 className="font-bold text-2xl">{t("icaro.title")}</h3>
					<span className="mb-2 text-muted-foreground text-sm italic">
						{t("icaro.subtitle")}
					</span>
					<ul className="mt-2 list-inside list-disc text-muted-foreground text-sm space-y-2">
						<li>{t("icaro.responsibilities.1")}</li>
						<li>{t("icaro.responsibilities.2")}</li>
						<li>{t("icaro.responsibilities.3")}</li>
					</ul>
				</CardBody>
			</Card>
		</div>
	);
}
