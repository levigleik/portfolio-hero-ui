import {
	Calistoga as FontCalistoga,
	Fira_Code as FontMono,
	Inter as FontSans,
} from "next/font/google";

export const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const fontMono = FontMono({
	subsets: ["latin"],
	variable: "--font-mono",
});

export const fontCalistoga = FontCalistoga({
	subsets: ["latin"],
	weight: ["400"],
	variable: "--font-calistoga",
});
