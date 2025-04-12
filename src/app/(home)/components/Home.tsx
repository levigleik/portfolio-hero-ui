"use client";
import { Tab, Tabs } from "@heroui/tabs";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import AboutSection from "../components/AboutSection";
import ProjectSection from "../../../components/project/ProjectSection";
import TabExperience from "../components/TabExperience";
import TabFormation from "../components/TabFormation";

export default function HomeComp() {
	const t = useTranslations("HomePage");
	return (
		<>
			<div className="flex w-full flex-col gap-4 text-center ">
				<AboutSection />
			</div>
			<div className="w-full flex-grow place-items-center py-8">
				<Tabs
					classNames={{
						panel: "w-full",
					}}
					variant="underlined"
					radius="full"
					color="primary"
					defaultSelectedKey={"experience"}
				>
					<Tab title={t("experience")} key="experience">
						<motion.div
							initial={{ opacity: 0.9, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, ease: "easeInOut" }}
						>
							<TabExperience />
						</motion.div>
					</Tab>
					<Tab title={t("formation")} key="formation">
						<motion.div
							initial={{ opacity: 0.9, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, ease: "easeInOut" }}
						>
							<TabFormation />
						</motion.div>
					</Tab>
				</Tabs>
			</div>
			<div className="w-full flex-grow py-8">
				<ProjectSection />
			</div>
		</>
	);
}
