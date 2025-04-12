import { Link } from "@heroui/link";
import { useTranslations } from "next-intl";
import { FaExclamationTriangle } from "react-icons/fa";

export default function NotFound() {
	const t = useTranslations("NotFoundPage");

	return (
		<div className="flex h-screen flex-col items-center justify-center">
			<h1 className="mb-4 font-bold text-2xl">{t("error-404")}</h1>
			<FaExclamationTriangle size={50} className="mb-4 text-2xl" />
			<h1 className="font-bold text-2xl">{t("page-not-found")}</h1>
			<Link href="/" color="foreground" className={"mt-8"}>
				{t("go-back")}
			</Link>
		</div>
	);
}
