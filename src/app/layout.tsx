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
						"min-h-screen overflow-x-hidden font-sans antialiased",
						fontSans.variable,
						fontMono.variable,
						fontCalistoga.variable,
					)}
				>
					<NextIntlClientProvider>
						<Providers>
							<div className="relative min-h-screen overflow-x-hidden">
								<div className="pointer-events-none fixed left-[-8rem] top-[-6rem] z-0 h-80 w-80 rounded-full bg-[var(--orb-primary)] blur-[110px]" />
								<div className="pointer-events-none fixed right-[-7rem] top-24 z-0 h-72 w-72 rounded-full bg-[var(--orb-secondary)] blur-[120px]" />
								<div className="pointer-events-none fixed bottom-[-10rem] left-1/2 z-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[var(--orb-tertiary)] blur-[150px]" />
								<div className="pointer-events-none fixed inset-0 z-0 opacity-70 [background-image:radial-gradient(var(--grid-dot)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.95),transparent_96%)]" />
								<Navbar />
								<main className="relative z-10 flex flex-col pb-20">
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
