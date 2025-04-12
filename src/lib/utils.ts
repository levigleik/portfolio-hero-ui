import Cookie from "js-cookie";

export const setLocale = (locale: "en" | "pt-BR") => {
	Cookie.set("NEXT_LOCALE", locale);
};
