import { type ClassValue, clsx } from "clsx";
import Cookie from "js-cookie";
import { twMerge } from "tailwind-merge";

export const setLocale = (locale: "en" | "pt-BR") => {
	Cookie.set("NEXT_LOCALE", locale);
};
