"use client";
import { locales, type AppLocale } from "@/i18n/config";
import { setLocale } from "@/lib/utils";
import { Button } from "@heroui/button";
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@heroui/dropdown";
import { cn } from "@heroui/theme";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function LanguageSelector({
	className,
}: { className?: string }) {
	const router = useRouter();
	const t = useTranslations("LanguageSelector");
	const locale = useLocale();
	const currentLocale = locales.includes(locale as AppLocale)
		? (locale as AppLocale)
		: "pt-BR";

	const localeFlagMap: Record<AppLocale, string> = {
		"pt-BR": "fi fi-br",
		en: "fi fi-us",
		es: "fi fi-es",
		fr: "fi fi-fr",
		it: "fi fi-it",
		zh: "fi fi-cn",
	};

	return (
		<Dropdown>
			<DropdownTrigger>
				<Button
					variant="bordered"
					aria-label={t("select-language")}
					isIconOnly
					radius="full"
					className={cn(
						"border-[var(--page-border)] bg-[var(--page-panel-strong)] text-[var(--page-text)] shadow-none transition-colors hover:border-[var(--page-border-strong)] hover:bg-[var(--page-panel)]",
						className,
					)}
				>
					<span className={localeFlagMap[currentLocale]} />
				</Button>
			</DropdownTrigger>
			<DropdownMenu
				disallowEmptySelection
				aria-label={t("select-language")}
				selectionMode="single"
				variant="flat"
				onSelectionChange={(value) => {
					setLocale(value.currentKey as AppLocale);
					router.refresh();
				}}
				defaultSelectedKeys={[currentLocale]}
			>
				<DropdownItem key="pt-BR" classNames={{ title: "gap-2 flex" }}>
					<span className="fi fi-br" />
					{t("portuguese")}
				</DropdownItem>
				<DropdownItem key="en" classNames={{ title: "gap-2 flex" }}>
					<span className="fi fi-us" />
					{t("english")}
				</DropdownItem>
				<DropdownItem key="es" classNames={{ title: "gap-2 flex" }}>
					<span className="fi fi-es" />
					{t("spanish")}
				</DropdownItem>
				<DropdownItem key="fr" classNames={{ title: "gap-2 flex" }}>
					<span className="fi fi-fr" />
					{t("french")}
				</DropdownItem>
				<DropdownItem key="it" classNames={{ title: "gap-2 flex" }}>
					<span className="fi fi-it" />
					{t("italian")}
				</DropdownItem>
				<DropdownItem key="zh" classNames={{ title: "gap-2 flex" }}>
					<span className="fi fi-cn" />
					{t("mandarin")}
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
}
