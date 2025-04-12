"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FaEnvelope, FaFilePdf, FaGithub, FaLinkedin } from "react-icons/fa";

export default function AboutSection() {
	const t = useTranslations("HomePage");
	return (
		<>
			<div className="flex flex-col gap-1">
				<span className="font-calistoga text-5xl tracking-widest lg:text-7xl">
					Levi Gleik
				</span>
				<span className="font-sans text-xl italic">
					{t("front-end-developer")}
				</span>
			</div>
			<div className="mt-4 flex justify-center gap-4">
				<Link
					href="https://github.com/levigleik"
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaGithub size={30} className="hover:text-gray-600" />
				</Link>
				<Link
					href="https://linkedin.com/in/levi-gleik"
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaLinkedin size={30} className="hover:text-gray-600" />
				</Link>
				<Link href="mailto:levigleik@gmail.com">
					<FaEnvelope size={30} className="hover:text-gray-600" />
				</Link>
			</div>
			<div className="flex w-full justify-center ">
				<Link
					href="/resume.pdf"
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 font-medium text-sm shadow-sm transition-colors hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
				>
					{t("resume")}
					<FaFilePdf size={20} />
				</Link>
			</div>
		</>
	);
}
