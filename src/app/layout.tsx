import "@/styles/globals.css";
import "flag-icons/css/flag-icons.min.css";
import { Link } from "@heroui/link";
import clsx from "clsx";
import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";

import { getLocale } from "next-intl/server";

import Navbar from "@/components/navbar/NavbarWrapper";
import { fontSans } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import { Providers } from "@/providers/providers";

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	icons: {
		icon: "/favicon.ico",
	},
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const locale = await getLocale();
	return (
		<html suppressHydrationWarning lang={locale}>
			<head />
			<body
				className={clsx(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable,
				)}
			>
				<NextIntlClientProvider>
					<Providers>
						<div className="container mx-auto flex h-screen max-w-3xl flex-col gap-8 px-2 py-6 sm:px-6 md:px-8">
							<Navbar />
							<main>{children}</main>
						</div>
					</Providers>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
