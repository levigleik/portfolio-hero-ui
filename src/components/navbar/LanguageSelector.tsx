"use client";
import { setLocale } from "@/lib/utils";
import { Button } from "@heroui/button";
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@heroui/dropdown";
import { useLocale, useTranslations } from "next-intl";

import { useRouter } from "next/navigation";

export default function LanguageSelector() {
	const router = useRouter();

	const t = useTranslations("LanguageSelector");
	const locale = useLocale();

	return (
		<Dropdown>
			<DropdownTrigger>
				<Button
					variant="bordered"
					aria-label={t("select-language")}
					isIconOnly
					radius="full"
					size="sm"
				>
					{locale === "pt-BR" ? (
						<span className="fi fi-br" />
					) : (
						<span className="fi fi-us" />
					)}
				</Button>
			</DropdownTrigger>
			<DropdownMenu
				disallowEmptySelection
				aria-label="Single selection example"
				selectionMode="single"
				variant="flat"
				onSelectionChange={(value) => {
					setLocale(value.currentKey as "pt-BR" | "en");
					router.refresh();
				}}
				defaultSelectedKeys={[locale]}
			>
				<DropdownItem key="pt-BR" classNames={{ title: "gap-2 flex" }}>
					<span className="fi fi-br" />
					Português
				</DropdownItem>
				<DropdownItem key="en" classNames={{ title: "gap-2 flex" }}>
					<span className="fi fi-us" />
					English
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
		// <DropdownMenu>
		// 	<DropdownMenuTrigger asChild>
		// 	</DropdownMenuTrigger>
		// 	<DropdownMenuContent className="w-56" align="end">
		// 		<DropdownMenuGroup>
		// 			<DropdownMenuCheckboxItem
		// 				checked={locale === "pt-BR"}
		// 				onCheckedChange={() => {
		// 					setLocale("pt-BR");
		// 					router.refresh();
		// 				}}
		// 			>
		// 				<span className="fi fi-br" />
		// 				Português
		// 			</DropdownMenuCheckboxItem>
		// 			<DropdownMenuCheckboxItem
		// 				checked={locale === "en"}
		// 				onCheckedChange={() => {
		// 					setLocale("en");
		// 					router.refresh();
		// 				}}
		// 			>
		// 				<span className="fi fi-us" />
		// 				English
		// 			</DropdownMenuCheckboxItem>
		// 		</DropdownMenuGroup>
		// 	</DropdownMenuContent>
		// </DropdownMenu>
	);
}
