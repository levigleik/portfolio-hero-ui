import { defaultLocale, isAppLocale } from "@/i18n/config";
import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
	const cookieLocale = (await cookies()).get("NEXT_LOCALE")?.value;
	const locale =
		cookieLocale && isAppLocale(cookieLocale) ? cookieLocale : defaultLocale;

	return {
		locale,
		messages: (await import(`../../messages/${locale}.json`)).default,
	};
});
