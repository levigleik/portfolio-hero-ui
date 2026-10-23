"use client";

import { Button } from "@heroui/button";
import { cn } from "@heroui/theme";
import { useIsSSR } from "@react-aria/ssr";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useState } from "react";
import { flushSync } from "react-dom";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeSelector({ className }: { className?: string }) {
	const { resolvedTheme, setTheme } = useTheme();
	const t = useTranslations("ThemeSelector");
	const isSSR = useIsSSR();
	const isDarkTheme = isSSR || resolvedTheme === "dark";
	const [isAnimating, setIsAnimating] = useState(false);

	function toggleTheme() {
		const root = document.documentElement;
		if (root.hasAttribute("data-theme-transition")) return;
		const nextTheme = isDarkTheme ? "light" : "dark";
		const updateTheme = () => {
			flushSync(() => setTheme(nextTheme));
			root.classList.toggle("dark", nextTheme === "dark");
			root.style.colorScheme = nextTheme;
		};

		if (
			!document.startViewTransition ||
			window.matchMedia("(prefers-reduced-motion: reduce)").matches
		) {
			updateTheme();
			return;
		}

		root.setAttribute("data-theme-transition", "");
		setIsAnimating(true);
		const finish = () => {
			root.removeAttribute("data-theme-transition");
			setIsAnimating(false);
		};
		try {
			const transition = document.startViewTransition(updateTheme);
			void transition.ready.catch(() => {});
			void transition.finished.catch(() => {}).finally(finish);
		} catch {
			finish();
			updateTheme();
		}
	}

	return (
		<Button
			variant="bordered"
			onPress={toggleTheme}
			isDisabled={isAnimating}
			className={cn(
				"theme-toggle relative border-[var(--page-border)] bg-[var(--page-panel-strong)] text-[var(--page-text)] shadow-none transition-colors hover:border-[var(--page-border-strong)] hover:bg-[var(--page-panel)]",
				className,
			)}
			data-dark={isDarkTheme}
			aria-label={t("change-theme")}
			radius="full"
			isIconOnly
		>
			<FaSun className="theme-toggle-sun" size={21} aria-hidden="true" />
			<FaMoon className="theme-toggle-moon" size={21} aria-hidden="true" />
		</Button>
	);
}
