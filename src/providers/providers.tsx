"use client";
import { ErrorProvider } from "./error-provider";

import { HeroUIProvider } from "@heroui/system";
import { ToastProvider } from "@heroui/toast";
import { useRouter } from "next/navigation";
import type * as React from "react";
import { ThemeProvider } from "./theme-provider";

export interface ProvidersProps {
	children: React.ReactNode;
}

declare module "@react-types/shared" {
	interface RouterConfig {
		routerOptions: NonNullable<
			Parameters<ReturnType<typeof useRouter>["push"]>[1]
		>;
	}
}

export function Providers({ children }: ProvidersProps) {
	const router = useRouter();

	return (
		<HeroUIProvider navigate={router.push}>
			<ErrorProvider>
				<ThemeProvider>
					<ToastProvider
					// toastProps={{}}
					/>
					{children}
				</ThemeProvider>
			</ErrorProvider>
		</HeroUIProvider>
	);
}
