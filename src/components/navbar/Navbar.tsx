"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import LanguageSelector from "./LanguageSelector";
import ThemeSelector from "./ThemeSelector";

const sectionIds = [
	"hero",
	"about",
	"projects",
	"experience",
	"formation",
] as const;
type SectionId = (typeof sectionIds)[number];

interface NavigationItem {
	href: string;
	label: string;
	sectionId: SectionId;
}

export default function NavbarComp() {
	const t = useTranslations("Navbar");
	const pathname = usePathname();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [activeSection, setActiveSection] = useState<SectionId>("hero");

	const isProjectsPage = pathname === "/projects";

	useEffect(() => {
		setIsMenuOpen(false);
	}, [pathname]);

	useEffect(() => {
		if (isProjectsPage) {
			setActiveSection("projects");
			return;
		}

		const updateActiveSection = () => {
			const scrollPosition = window.scrollY + 180;
			let currentSection: SectionId = "hero";

			for (const sectionId of sectionIds) {
				const section = document.getElementById(sectionId);

				if (!section) {
					continue;
				}

				const sectionTop = section.offsetTop;
				const sectionBottom = sectionTop + section.offsetHeight;

				if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
					currentSection = sectionId;
					break;
				}

				if (scrollPosition >= sectionTop) {
					currentSection = sectionId;
				}
			}

			setActiveSection(currentSection);
		};

		updateActiveSection();

		window.addEventListener("scroll", updateActiveSection, { passive: true });
		window.addEventListener("resize", updateActiveSection);

		return () => {
			window.removeEventListener("scroll", updateActiveSection);
			window.removeEventListener("resize", updateActiveSection);
		};
	}, [isProjectsPage]);

	const navigation: NavigationItem[] = [
		{
			href: isProjectsPage ? "/" : "#hero",
			label: t("home"),
			sectionId: "hero",
		},
		{
			href: isProjectsPage ? "/#about" : "#about",
			label: t("about"),
			sectionId: "about",
		},
		{
			href: isProjectsPage ? "/projects" : "#projects",
			label: t("projects"),
			sectionId: "projects",
		},
		{
			href: isProjectsPage ? "/#experience" : "#experience",
			label: t("experience"),
			sectionId: "experience",
		},
		{
			href: isProjectsPage ? "/#formation" : "#formation",
			label: t("formation"),
			sectionId: "formation",
		},
	];

	return (
		<header className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6 lg:px-10">
			<div className="mx-auto max-w-7xl">
				<div className="glass-panel flex items-center justify-between rounded-[28px] px-4 py-3 sm:px-6">
					<Link
						href="/"
						className="flex items-center gap-3"
						onClick={() => {
							setIsMenuOpen(false);
							setActiveSection("hero");
						}}
					>
						<span className="flex size-11 items-center justify-center rounded-xl border border-[var(--page-border-strong)] bg-[linear-gradient(135deg,rgba(255,255,255,0.18),rgba(255,255,255,0.04))] font-mono text-sm font-bold uppercase tracking-[0.35em] text-[var(--page-text)]">
							LG
						</span>

						<span className="hidden sm:block">
							<span className="block text-[0.65rem] font-semibold uppercase tracking-[0.38em] text-[var(--page-muted)]">
								{t("brand-tag")}
							</span>
							<span className="text-lg font-semibold tracking-tight text-[var(--page-text)]">
								Levi <span className="text-[var(--brand)]">Gleik</span>
							</span>
						</span>
					</Link>

					<nav className="hidden items-center gap-2 md:flex">
						{navigation.map((item) => (
							<Link
								key={`${item.sectionId}-${item.label}`}
								href={item.href}
								onClick={() => setActiveSection(item.sectionId)}
								className={clsx(
									"rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] transition-colors",
									activeSection === item.sectionId
										? "bg-[var(--page-panel-strong)] text-[var(--brand)]"
										: "text-[var(--page-muted)] hover:text-[var(--page-text)]",
								)}
							>
								{item.label}
							</Link>
						))}
					</nav>

					<div className="hidden items-center gap-3 md:flex">
						<LanguageSelector className="border-[var(--page-border)] bg-[var(--page-panel-strong)]" />
						<ThemeSelector className="border-[var(--page-border)] bg-[var(--page-panel-strong)]" />
					</div>

					<button
						type="button"
						className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--page-border)] bg-[var(--page-panel-strong)] text-[var(--page-text)] transition-colors hover:border-[var(--page-border-strong)] md:hidden"
						aria-expanded={isMenuOpen}
						aria-label={t("toggle-menu")}
						onClick={() => setIsMenuOpen((current) => !current)}
					>
						{isMenuOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
					</button>
				</div>

				<div
					className={clsx(
						"glass-panel mt-3 overflow-hidden rounded-[28px] px-4 transition-all duration-300 md:hidden",
						isMenuOpen
							? "max-h-96 py-4 opacity-100"
							: "pointer-events-none max-h-0 py-0 opacity-0",
					)}
				>
					<nav className="flex flex-col gap-2">
						{navigation.map((item) => (
							<Link
								key={`${item.sectionId}-${item.label}`}
								href={item.href}
								className={clsx(
									"rounded-2xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition-colors",
									activeSection === item.sectionId
										? "bg-[var(--page-panel-strong)] text-[var(--brand)]"
										: "text-[var(--page-muted)] hover:bg-[var(--page-panel-strong)] hover:text-[var(--page-text)]",
								)}
								onClick={() => {
									setIsMenuOpen(false);
									setActiveSection(item.sectionId);
								}}
							>
								{item.label}
							</Link>
						))}
					</nav>

					<div className="mt-4 flex items-center gap-3 border-t border-[var(--page-border)] pt-4">
						<LanguageSelector className="border-[var(--page-border)] bg-[var(--page-panel-strong)]" />
						<ThemeSelector className="border-[var(--page-border)] bg-[var(--page-panel-strong)]" />
					</div>
				</div>
			</div>
		</header>
	);
}
