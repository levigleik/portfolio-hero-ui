"use client";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { useLocale, useTranslations } from "next-intl";
import { FaEnvelope, FaFilePdf, FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

export default function AboutSection() {
	const t = useTranslations("HomePage");
	const locale = useLocale();
	return (
		<>
			<motion.div
				initial={{ opacity: 0.9, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, ease: "easeInOut" }}
				className="flex flex-col gap-1"
			>
				<span className="font-calistoga text-5xl tracking-widest lg:text-7xl gradient-text">
					Levi Gleik
				</span>
				<span className="font-sans text-lg italic">
					{t("front-end-developer")}
				</span>
			</motion.div>
			<motion.div
				initial={{ opacity: 0.9, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, ease: "easeInOut" }}
				className="mt-4 flex justify-center gap-4"
			>
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
			</motion.div>
			<motion.div
				initial={{ opacity: 0.9, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, ease: "easeInOut" }}
				className="flex w-full justify-center mt-4"
			>
				<Button
					variant="bordered"
					radius="full"
					as={Link}
					href={`resume-${locale}.pdf`}
					isExternal
				>
					{t("resume")}
					<FaFilePdf size={20} />
				</Button>
			</motion.div>
		</>
	);
}
