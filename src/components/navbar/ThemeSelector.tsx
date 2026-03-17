"use client";
import { Button } from "@heroui/button";
import { cn } from "@heroui/theme";
import { useIsSSR } from "@react-aria/ssr";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeSelector({ className }: { className?: string }) {
	const { resolvedTheme, setTheme } = useTheme();
	const t = useTranslations("ThemeSelector");
	const isSSR = useIsSSR();
	const isDarkTheme = isSSR || resolvedTheme === "dark";

	return (
		<Button
			variant="bordered"
			onPress={() => setTheme(isDarkTheme ? "light" : "dark")}
			className={cn(
				"border-[var(--page-border)] bg-[var(--page-panel-strong)] text-[var(--page-text)] shadow-none transition-colors hover:border-[var(--page-border-strong)] hover:bg-[var(--page-panel)]",
				className,
			)}
			aria-label={t("change-theme")}
			radius="full"
			isIconOnly
		>
			{isDarkTheme ? <FaSun size={14} /> : <FaMoon size={14} />}
		</Button>
	);
}
