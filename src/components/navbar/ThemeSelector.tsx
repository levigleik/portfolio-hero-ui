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

	const handleThemeChange = () => {
		const newTheme = theme === "dark" ? "light" : "dark";

		if (!document.startViewTransition) {
			setTheme(newTheme);
			return;
		}

		document.startViewTransition(() => {
			setTheme(newTheme);
		});
	};

	return (
		<Button
			variant="bordered"
			onPress={handleThemeChange}
			className={cn(className)}
			aria-label={t("change-theme")}
			radius="full"
			isIconOnly
		>
			{isSSR ? <FaSun /> : theme === "dark" ? <FaSun /> : <FaMoon />}
		</Button>
	);
}
