import chronoStudy from "../assets/images/projects/chrono-study.png";
import dispatchSystem from "../assets/images/projects/dispatch-system.png";
import dlav from "../assets/images/projects/dlav.png";
import gestaoClinica from "../assets/images/projects/gestao-clinica.png";
import oscManager from "../assets/images/projects/osc-manager.png";
import pesquisaSatisfacao from "../assets/images/projects/pesquisa-satisfacao.png";
import reunioes from "../assets/images/projects/reunioes.png";
import sauloImoveis from "../assets/images/projects/saulo-imoveis.png";
import servrent from "../assets/images/projects/servrent.png";
import tizenIptvOpen from "../assets/images/projects/tizen-iptv-open.png";
import transferBack from "../assets/images/projects/transfer-back.png";
import transferCase from "../assets/images/projects/transfer-case.png";
import transferNestjs from "../assets/images/projects/transfer-nestjs.png";
import vacationPlan from "../assets/images/projects/vacation-plan.png";
import viuGanhou from "../assets/images/projects/viu-ganhou.png";

export const PROJECT_TECHONOLOGIES = [
	{
		name: "gestao-clinica",
		photo: gestaoClinica.src,
		techonologies: ["React", "Vite", "Bootstrap", "AdonisJS", "Lucid ORM"],
		git: null,
		url: "https://novogestaoclinica.netlify.app",
	},
	{
		name: "saulo-imoveis",
		photo: sauloImoveis.src,
		techonologies: ["WordPress", "HTML", "CSS", "JavaScript", "PHP", "MySQL"],
		git: null,
		url: "https://sauloimoveisce.com.br",
	},

	{
		name: "reunioes",
		photo: reunioes.src,
		techonologies: [
			"React",
			"Bootstrap",
			"Ant Design",
			"Socket.IO",
			"NestJS",
			"Prisma",
			"Redis",
		],
		git: null,
		url: "https://atasreunioes.com",
	},

	{
		name: "pesquisa-satisfacao",
		photo: pesquisaSatisfacao.src,
		techonologies: [
			"React",
			"Material UI",
			"NestJS",
			"Prisma",
			"Redis",
			"React Chart.js",
		],
		git: null,
		url: "https://pesquisasatisfacao.netlify.app",
	},
	{
		name: "dlav",
		photo: dlav.src,
		techonologies: [
			"NextJS",
			"TailwindCSS",
			"NextUI",
			"NestJS",
			"Prisma",
			"NodeMailer",
			"Service Worker",
			"Redis",
		],
		git: "https://github.com/levigleik/front-dlav-public",
		url: "https://dlav.vercel.app",
	},

	{
		name: "viu-ganhou",
		photo: viuGanhou.src,
		techonologies: [
			"NextJS",
			"NextUI",
			"TailwindCSS",
			"Wagmi",
			"CCPayment",
			"Prisma",
		],
		git: null,
		url: null,
	},
	{
		name: "transfer-case",
		photo: transferCase.src,
		techonologies: [
			"NextJS",
			"TypeScript",
			"TailwindCSS",
			"shadcn/ui",
			"TanStack Query",
			"TanStack Table",
			"React Hook Form",
			"Zod",
		],
		git: "https://github.com/levigleik/transfer-case",
		url: "https://transfer-case-five.vercel.app",
	},
	{
		name: "transfer-back",
		photo: transferBack.src,
		techonologies: [
			"NodeJS",
			"TypeScript",
			"ExpressJS",
			"PostgreSQL",
			"Prisma",
			"Redis",
			"Docker",
			"Swagger",
		],
		git: "https://github.com/levigleik/transfer-back",
		url: null,
	},
	{
		name: "transfer-nestjs",
		photo: transferNestjs.src,
		techonologies: [
			"NestJS",
			"TypeScript",
			"PostgreSQL",
			"Prisma",
			"Redis",
			"Swagger",
			"Zod",
			"Bun",
		],
		git: "https://github.com/levigleik/transfer-nestjs",
		url: null,
	},
	{
		name: "tizen-iptv-open",
		photo: tizenIptvOpen.src,
		techonologies: [
			"NextJS",
			"TypeScript",
			"TailwindCSS",
			"shadcn/ui",
			"TanStack Query",
			"HLS.js",
			"Tizen",
			"Zustand",
		],
		git: "https://github.com/levigleik/tizen-iptv-open",
		url: "https://tizen-iptv-open.vercel.app",
	},
	{
		name: "chrono-study",
		photo: chronoStudy.src,
		techonologies: [
			"NextJS",
			"TailwindCSS",
			"HeroUI",
			"framer-motion",
			"view-transition-api",
			"zod",
			"React Hook Form",
		],
		git: "https://github.com/levigleik/chrono-study",
		url: "https://chrono-study.vercel.app",
	},
	{
		name: "dispatch-system",
		photo: dispatchSystem.src,
		techonologies: ["Vite", "React", "Ant Design", "NestJS", "Prisma"],
		git: null,
		url: "http://dispatch-system.netlify.app",
	},
	{
		name: "vacation-plan",
		photo: vacationPlan.src,
		techonologies: ["NextJS", "NextUI", "TailwindCSS", "Prisma"],
		git: "https://github.com/levigleik/vacation-plan",
		url: "https://vacation-plan.vercel.app",
	},
	{
		name: "osc-manager",
		photo: oscManager.src,
		techonologies: ["NextJS", "TailwindCSS", "NextUI", "Prisma"],
		git: "https://github.com/levigleik/osc-manager",
		url: "https://osc-manager.vercel.app",
	},

	{
		name: "servrent",
		photo: servrent.src,
		techonologies: ["WordPress", "HTML", "CSS", "JavaScript", "PHP", "MySQL"],
		git: null,
		url: "http://servrent.com.br",
	},
];
