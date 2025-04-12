"use client";
import { Button } from "@heroui/button";
import { cn } from "@heroui/theme";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeSelector({ className }: { className?: string }) {
	const { setTheme, theme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const t = useTranslations("ThemeSelector");

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<Button
			variant="bordered"
			onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
			className={cn(className)}
			aria-label={t("change-theme")}
			radius="full"
			size="sm"
			isIconOnly
		>
			{mounted && (theme === "dark" ? <FaSun /> : <FaMoon />)}
		</Button>
	);
}
