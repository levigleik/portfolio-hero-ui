"use client";

import clsx from "clsx";
import { motion, useScroll } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import LanguageSelector from "./LanguageSelector";
import ThemeSelector from "./ThemeSelector";

const sections = [
	"hero",
	"about",
	"projects",
	"experience",
	"formation",
	"contact",
] as const;
type Section = (typeof sections)[number];

export default function NavbarComp() {
	const t = useTranslations("Navbar");
	const home = useTranslations("HomePage");
	const n = useTranslations("Narrative");
	const pathname = usePathname();
	const locale = useLocale();
	const [open, setOpen] = useState(false);
	const [active, setActive] = useState<Section>("hero");
	const { scrollYProgress } = useScroll();
	const isArchive = pathname === "/projects";

	useEffect(() => {
		setOpen(false);
		if (isArchive) {
			setActive("projects");
			return;
		}
		let frame = 0;
		const update = () => {
			let current: Section = "hero";
			for (const id of sections) {
				const element = document.getElementById(id);
				if (
					element &&
					element.getBoundingClientRect().top <= window.innerHeight * 0.4
				)
					current = id;
			}
			setActive(current);
		};
		const onScroll = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(update);
		};
		update();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		};
	}, [isArchive]);

	useEffect(() => {
		const escape = (event: KeyboardEvent) => {
			if (event.key === "Escape") setOpen(false);
		};
		window.addEventListener("keydown", escape);
		return () => window.removeEventListener("keydown", escape);
	}, []);

	const label = (id: Section) => t(id === "hero" ? "home" : id);
	const href = (id: Section) => `${isArchive ? "/" : ""}#${id}`;

	return (
		<>
			<a className="skip-link" href="#main-content">
				{n("skip-content")}
			</a>
			<header className="site-header">
				<div className="navbar-inner">
					<a
						href="/#hero"
						className="wordmark"
						aria-label={siteConfig.name}
						onClick={() => setOpen(false)}
					>
						{siteConfig.name}
					</a>
					<nav className="desktop-navigation" aria-label={n("navigation")}>
						{(["about", "projects", "experience"] as Section[]).map((id) => (
							<a
								key={id}
								href={href(id)}
								aria-current={active === id ? "location" : undefined}
								className={clsx(active === id && "is-active")}
							>
								{label(id)}
							</a>
						))}
					</nav>
					<div className="navbar-actions">
						<span className="desktop-preferences">
							<LanguageSelector />
							<ThemeSelector />
						</span>
						<a className="nav-contact" href={href("contact")}>
							{t("contact")}
							<ArrowUpRight size={16} />
						</a>
						<button
							type="button"
							className="menu-toggle"
							aria-controls="mobile-navigation"
							aria-expanded={open}
							aria-label={t("toggle-menu")}
							onClick={() => setOpen(!open)}
						>
							{open ? <X size={22} /> : <Menu size={22} />}
						</button>
					</div>
				</div>
				<div
					className="mobile-navigation"
					id="mobile-navigation"
					hidden={!open}
				>
					<nav aria-label={n("navigation")}>
						{sections.map((id) => (
							<a
								key={id}
								href={href(id)}
								aria-current={active === id ? "location" : undefined}
								onClick={() => setOpen(false)}
							>
								{label(id)}
								<ArrowUpRight size={18} />
							</a>
						))}
					</nav>
					<div className="mobile-preferences">
						<LanguageSelector />
						<ThemeSelector />
						<a
							href={locale === "pt-BR" ? "/resume-pt-BR.pdf" : "/resume-en.pdf"}
							target="_blank"
							rel="noreferrer"
						>
							{home("resume")}
							<ArrowUpRight size={16} />
						</a>
					</div>
				</div>
				<motion.div
					className="page-progress"
					style={{ scaleX: scrollYProgress }}
				/>
			</header>
			{!isArchive && (
				<nav className="section-rail" aria-label={n("chapters")}>
					{sections.map((id) => (
						<a
							key={id}
							href={`#${id}`}
							className={active === id ? "is-active" : ""}
							aria-label={label(id)}
							aria-current={active === id ? "location" : undefined}
						>
							<span>{label(id)}</span>
							<i />
						</a>
					))}
				</nav>
			)}
		</>
	);
}
