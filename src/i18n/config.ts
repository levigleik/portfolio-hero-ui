export const locales = ["pt-BR", "en", "es"] as const;

export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = "pt-BR";

export function isAppLocale(value: string): value is AppLocale {
	return locales.includes(value as AppLocale);
}
