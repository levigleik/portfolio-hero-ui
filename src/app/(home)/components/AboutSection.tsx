"use client";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { useTranslations } from "next-intl";
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
				<Link href="https://github.com/levigleik" isExternal color="foreground">
					<FaGithub size={30} />
				</Link>
				<Link
					href="https://linkedin.com/in/levi-gleik"
					isExternal
					color="foreground"
				>
					<FaLinkedin size={30} />
				</Link>
				<Link href="mailto:levigleik@gmail.com" color="foreground">
					<FaEnvelope size={30} />
				</Link>
			</div>
			<div className="flex w-full justify-center mt-4">
				<Button
					variant="bordered"
					radius="full"
					as={Link}
					href="/resume.pdf"
					isExternal
				>
					{t("resume")}
					<FaFilePdf size={20} />
				</Button>
			</div>
		</>
	);
}
