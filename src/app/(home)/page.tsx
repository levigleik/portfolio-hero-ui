"use client";
import { Card, CardBody } from "@heroui/card";
import { Tab, Tabs } from "@heroui/tabs";
import { useTranslations } from "next-intl";
import AboutSection from "./components/AboutSection";
import ProjectSection from "./components/ProjectSection";
import TabExperience from "./components/TabExperience";
import TabFormation from "./components/TabFormation";

export default function HomePage() {
	const t = useTranslations("HomePage");
	return (
		<div className="mt-4 flex flex-col items-center justify-center gap-4 font-sans lg:mt-10">
			<div className="flex w-full flex-col gap-4 text-center ">
				<AboutSection />
			</div>
			<div className="w-full flex-grow place-items-center py-8">
				<Tabs
					classNames={{
						panel: "w-full",
					}}
					variant="bordered"
					radius="full"
					color="primary"
				>
					<Tab title={t("experience")} key="experience">
						<TabExperience />
					</Tab>
					<Tab title={t("formation")} key="formation">
						<TabFormation />
					</Tab>
				</Tabs>
			</div>
			<div className="w-full flex-grow py-8">{/* <ProjectSection /> */}</div>
		</div>
	);
}
