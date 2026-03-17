"use client";

import { type AppLocale, locales } from "@/i18n/config";
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
		<Dropdown placement="bottom-end">
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
				defaultSelectedKeys={[currentLocale]}
				classNames={{
					base: "min-w-[220px] rounded-2xl bg-[var(--page-panel-strong)] p-1 shadow-xl backdrop-blur-xl",
					list: "gap-1",
				}}
				itemClasses={{
					base: "rounded-xl px-4 py-2 data-[hover=true]:bg-white/10 data-[selected=true]:bg-white/10",
					title: "text-[var(--page-text)]",
					selectedIcon: "text-[var(--page-text)]",
				}}
				onSelectionChange={(value) => {
					setLocale(value.currentKey as AppLocale);
					router.refresh();
				}}
			>
				<DropdownItem key="pt-BR" startContent={<span className="fi fi-br" />}>
					{t("portuguese")}
				</DropdownItem>
				<DropdownItem key="en" startContent={<span className="fi fi-us" />}>
					{t("english")}
				</DropdownItem>
				<DropdownItem key="es" startContent={<span className="fi fi-es" />}>
					{t("spanish")}
				</DropdownItem>
				<DropdownItem key="fr" startContent={<span className="fi fi-fr" />}>
					{t("french")}
				</DropdownItem>
				<DropdownItem key="it" startContent={<span className="fi fi-it" />}>
					{t("italian")}
				</DropdownItem>
				<DropdownItem key="zh" startContent={<span className="fi fi-cn" />}>
					{t("mandarin")}
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
}
