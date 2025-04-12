"use client";
import { Link } from "@heroui/link";
import {
	NavbarBrand,
	NavbarContent,
	Navbar as NavbarHeroUI,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
} from "@heroui/navbar";
import React from "react";

import logoImage from "@/assets/images/logo.png";
import { Image } from "@heroui/image";
import LanguageSelector from "./LanguageSelector";
import ThemeSelector from "./ThemeSelector";
import { usePathname } from "next/navigation";

interface MenuItem {
	title: string;
	url: string;
	description?: string;
	icon?: React.ReactNode;
}

interface NavbarProps {
	logo: {
		url: string;
		src: string;
		alt: string;
	};
	menu: MenuItem[];
}

export default function NavbarComp({ logo, menu }: NavbarProps) {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const path = usePathname();

	console.log("path", path);

	return (
		<NavbarHeroUI onMenuOpenChange={setIsMenuOpen}>
			<NavbarContent>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					className="sm:hidden"
				/>
				<NavbarBrand>
					<Image src={logo.src} alt={logo.alt} width={40} height={40} />
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				{menu.map((item, index) => (
					<NavbarItem key={`${item.title}-${index}`}>
						<Link
							className="w-full"
							color={path === item.url ? "primary" : "foreground"}
							href={item.url}
							size="lg"
						>
							{item.title}
						</Link>
					</NavbarItem>
				))}
			</NavbarContent>
			<NavbarContent justify="end">
				<NavbarItem className="hidden lg:flex">
					<LanguageSelector />
				</NavbarItem>
				<NavbarItem>
					<ThemeSelector />
				</NavbarItem>
			</NavbarContent>
			<NavbarMenu>
				<NavbarMenuItem className="hidden sm:flex">
					<LanguageSelector />
				</NavbarMenuItem>
				<NavbarMenuItem>
					<ThemeSelector />
				</NavbarMenuItem>
				{menu.map((item, index) => (
					<NavbarMenuItem key={`${item.title}-${index}`}>
						<Link
							className="w-full"
							color={path === item.url ? "primary" : "foreground"}
							href={item.url}
							size="lg"
						>
							{item.title}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</NavbarHeroUI>
	);
}
