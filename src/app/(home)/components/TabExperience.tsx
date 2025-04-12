"use client";
import { Card, CardBody } from "@heroui/card";
import { useTranslations } from "next-intl";

export default function TabExperience() {
	const t = useTranslations("TabExperience");
	return (
		<div className="flex flex-col gap-4 p-4">
			<Card className="gap-0 p-4">
				<CardBody>
					<span className="text-muted-foreground text-sm">
						{t("macedo-soft-house.date")}
					</span>
					<h3 className="font-bold text-2xl">{t("macedo-soft-house.title")}</h3>
					<span className="mb-2 text-muted-foreground text-sm italic">
						{t("macedo-soft-house.subtitle")}
					</span>
					<ul className="mt-2 list-inside list-disc text-muted-foreground text-sm">
						<li>{t("macedo-soft-house.responsibilities.1")}</li>
						<li>{t("macedo-soft-house.responsibilities.2")}</li>
					</ul>
				</CardBody>
			</Card>
			<Card className="gap-0 p-4">
				<CardBody>
					<span className="text-muted-foreground text-sm">
						{t("greendot.date")}
					</span>
					<h3 className="font-bold text-2xl">{t("greendot.title")}</h3>
					<span className="mb-2 text-muted-foreground text-sm italic">
						{t("greendot.subtitle")}
					</span>
					<ul className="mt-2 list-inside list-disc text-muted-foreground text-sm">
						<li>{t("greendot.responsibilities.1")}</li>
						<li>{t("greendot.responsibilities.2")}</li>
						<li>{t("greendot.responsibilities.3")}</li>
					</ul>
				</CardBody>
			</Card>
		</div>
	);
}
