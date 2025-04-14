"use client";
import { Button } from "@heroui/button";
import { cn } from "@heroui/theme";
import { useIsSSR } from "@react-aria/ssr";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeSelector({ className }: { className?: string }) {
	const { setTheme, theme } = useTheme();
	const t = useTranslations("ThemeSelector");
	const isSSR = useIsSSR();

	return (
		<Button
			variant="bordered"
			onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
			className={cn(className)}
			aria-label={t("change-theme")}
			radius="full"
			isIconOnly
		>
			{isSSR || theme === "dark" ? <FaSun /> : <FaMoon />}
		</Button>
	);
}
