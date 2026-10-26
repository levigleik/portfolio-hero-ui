import { type AppLocale } from "@/i18n/config";
import Cookie from "js-cookie";

export const setLocale = (locale: AppLocale) => {
	Cookie.set("NEXT_LOCALE", locale);
};
