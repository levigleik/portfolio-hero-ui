import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
	title: { absolute: siteConfig.name },
};

export default function Layout({ children }: { children: ReactNode }) {
	return children;
}
