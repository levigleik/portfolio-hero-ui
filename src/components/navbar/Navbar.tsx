"use client";
import { Link } from "@heroui/link";
import {
	NavbarBrand,
	NavbarContent,
	Navbar as NavbarHeroUI,
	NavbarItem,
	NavbarMenuToggle,
} from "@heroui/navbar";

import {
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerHeader,
} from "@heroui/drawer";
import { Image } from "@heroui/image";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { type ReactNode, useState } from "react";
import { FaBars } from "react-icons/fa";
import LanguageSelector from "./LanguageSelector";
import ThemeSelector from "./ThemeSelector";

interface MenuItem {
	title: string;
	url: string;
	description?: string;
	icon?: ReactNode;
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
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const path = usePathname();

	const router = useTransitionRouter();

	function slideInOut() {
		document.documentElement.animate(
			[
				{
					opactity: 1,
					transform: "translateY(0)",
				},
				{
					opactity: 0.2,
					transform: "translateY(-35%)",
				},
			],
			{
				duration: 1500,
				easing: "cubic-bezier(0.25, 0.1, 0.25, 1)",
				fill: "forwards",
				pseudoElement: "::view-transition-old(root)",
			},
		);
		document.documentElement.animate(
			[
				{
					clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
				},
				{
					clipPath: "polygon(0% 100%, 100% 100%, 100% 0% 0% 0%)",
				},
			],
			{
				duration: 1500,
				easing: "cubic-bezier(0.25, 0.1, 0.25, 1)",
				fill: "forwards",
				pseudoElement: "::view-transition-new(root)",
			},
		);
	}

	return (
		<NavbarHeroUI
			onMenuOpenChange={setIsMenuOpen}
			isMenuOpen={false}
			classNames={{
				wrapper: "bg-background",
			}}
		>
			<NavbarContent className="hidden sm:flex gap-4">
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
							onClick={(e) => {
								e.preventDefault();
								router.push(item.url, {
									onTransitionReady: slideInOut,
								});
							}}
						>
							{item.title}
						</Link>
					</NavbarItem>
				))}
			</NavbarContent>
			<NavbarContent justify="end" className="sm:hidden">
				<NavbarMenuToggle
					icon={<FaBars />}
					className="w-10 h-10 rounded-full p-0 min-w-min border-medium border-default"
					// as={Button}
					// variant="bordered"
				/>
			</NavbarContent>
			<NavbarContent justify="end" className="gap-2 hidden lg:flex">
				<NavbarItem>
					<LanguageSelector />
				</NavbarItem>
				<NavbarItem>
					<ThemeSelector />
				</NavbarItem>
			</NavbarContent>

			<Drawer
				hideCloseButton
				// closeButton={
				// 	<Button isIconOnly variant="bordered">
				// 		<FaTimes size={16} />
				// 	</Button>
				// }
				classNames={{
					closeButton: "top-6 right-6",
				}}
				isOpen={isMenuOpen}
				onOpenChange={setIsMenuOpen}
				size="xs"
			>
				<DrawerContent className="p-6 bg-background">
					{(onClose) => (
						<>
							<DrawerHeader className="flex flex-col gap-1">
								<NavbarItem className="text-4xl font-calistoga tracking-wide">
									Levi Gleik
								</NavbarItem>
							</DrawerHeader>
							<DrawerBody>
								{menu.map((item, index) => (
									<NavbarItem key={`${item.title}-${index}`}>
										<Link
											className="w-full"
											color={path === item.url ? "primary" : "foreground"}
											href={item.url}
											size="lg"
											onPress={onClose}
										>
											{item.title}
										</Link>
									</NavbarItem>
								))}
								<NavbarItem className="flex gap-2 items-center">
									<LanguageSelector />
									<ThemeSelector />
								</NavbarItem>
							</DrawerBody>
						</>
					)}
				</DrawerContent>
			</Drawer>
		</NavbarHeroUI>
	);
}
