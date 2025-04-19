"use client";
import logoImage from "@/assets/images/logo.png";
import { useTranslations } from "next-intl";
import NavbarComp from "./Navbar";

export default function Navbar() {
	const t = useTranslations("Navbar");

	return (
		<NavbarComp
			logo={{
				url: "/",
				src: logoImage.src,
				alt: "logo",
			}}
			menu={[
				{ title: t("home"), url: "/" },
				{
					title: t("projects"),
					url: "/projects",
				},
			]}
		/>
	);
}
