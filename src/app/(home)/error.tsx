"use client";
import { Button } from "@heroui/button";
import { useTranslations } from "next-intl";
import { FaExclamationTriangle } from "react-icons/fa";

export default function ErrorPage() {
	const t = useTranslations("ErrorPage");
	return (
		<div className="flex h-screen flex-col items-center justify-center">
			<h1 className="mb-4 font-bold text-2xl">{t("error")}</h1>
			<FaExclamationTriangle size={50} className="mb-4 text-2xl" />
			<h1 className="font-bold text-2xl">{t("something-went-wrong")}</h1>
			<Button onPress={() => window.location.reload()} className="mt-8">
				{t("refresh")}
			</Button>
		</div>
	);
}
