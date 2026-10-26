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
	manifest: "/site.webmanifest",
	icons: {
		icon: [
			{ url: "/favicon.ico" },
			{ url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
			{ url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
		],
		apple: "/apple-touch-icon.png",
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
						"min-h-screen overflow-x-clip font-sans antialiased",
						fontSans.variable,
						fontMono.variable,
						fontCalistoga.variable,
					)}
				>
					<NextIntlClientProvider>
						<Providers>
							<div className="relative min-h-screen">
								<Navbar />
								<main id="main-content" className="relative">
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
