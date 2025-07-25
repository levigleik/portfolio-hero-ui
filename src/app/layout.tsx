import "@/styles/globals.css";
import clsx from "clsx";
import "flag-icons/css/flag-icons.min.css";
import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";

import { getLocale } from "next-intl/server";

import Navbar from "@/components/navbar/NavbarWrapper";
import { fontCalistoga, fontMono, fontSans } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import { Providers } from "@/providers/providers";
import { ViewTransitions } from "next-view-transitions";

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
		<ViewTransitions>
			<html suppressHydrationWarning lang={locale}>
				<head />
				<body
					className={clsx(
						"bg-background font-sans antialiased",
						fontSans.variable,
						fontMono.variable,
						fontCalistoga.variable,
					)}
				>
					<NextIntlClientProvider>
						<Providers>
							<div className="container mx-auto flex max-w-5xl flex-col gap-8 px-2 py-6 sm:px-6 md:px-8 ">
								<Navbar />
								<main className="mt-4 flex flex-col items-center justify-center gap-4 font-sans lg:mt-10">
									{children}
								</main>
							</div>
						</Providers>
					</NextIntlClientProvider>
				</body>
			</html>
		</ViewTransitions>
	);
}
