import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
	// Provide a static locale, fetch a user setting,
	// read from `cookies()`, `headers()`, etc.
	const locale = (await cookies()).get("NEXT_LOCALE")?.value || "pt-BR";

	return {
		locale,
		messages: (await import(`../../messages/${locale}.json`)).default,
	};
});
