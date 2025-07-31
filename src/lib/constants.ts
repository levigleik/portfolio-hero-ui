import chronoStudy from "../assets/images/projects/chrono-study.png";
import dispatchSystem from "../assets/images/projects/dispatch-system.png";
import dlav from "../assets/images/projects/dlav.png";
import gestaoClinica from "../assets/images/projects/gestao-clinica.png";
import oscManager from "../assets/images/projects/osc-manager.png";
import pesquisaSatisfacao from "../assets/images/projects/pesquisa-satisfacao.png";
import reunioes from "../assets/images/projects/reunioes.png";
import sauloImoveis from "../assets/images/projects/saulo-imoveis.png";
import servrent from "../assets/images/projects/servrent.png";
import vacationPlan from "../assets/images/projects/vacation-plan.png";
import viuGanhou from "../assets/images/projects/viu-ganhou.png";

export const PROJECT_TECHNOLOGIES = [
	{
		name: "dlav",
		photo: dlav.src,
		technologies: [
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
		name: "reunioes",
		photo: reunioes.src,
		technologies: [
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
		name: "gestao-clinica",
		photo: gestaoClinica.src,
		technologies: ["React", "Vite", "Bootstrap", "AdonisJS", "Lucid ORM"],
		git: null,
		url: "https://novogestaoclinica.netlify.app",
	},
	{
		name: "viu-ganhou",
		photo: viuGanhou.src,
		technologies: [
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
		name: "pesquisa-satisfacao",
		photo: pesquisaSatisfacao.src,
		technologies: [
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
		name: "chrono-study",
		photo: chronoStudy.src,
		technologies: [
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
		technologies: ["Vite", "React", "Ant Design", "NestJS", "Prisma"],
		git: null,
		url: "https://dispatch-system.netlify.app",
	},
	{
		name: "vacation-plan",
		photo: vacationPlan.src,
		technologies: ["NextJS", "NextUI", "TailwindCSS", "Prisma"],
		git: "https://github.com/levigleik/vacation-plan",
		url: null,
	},
	{
		name: "osc-manager",
		photo: oscManager.src,
		technologies: ["NextJS", "TailwindCSS", "NextUI", "Prisma"],
		git: "https://github.com/levigleik/osc-manager",
		url: "https://osc-manager.vercel.app",
	},
	{
		name: "saulo-imoveis",
		photo: sauloImoveis.src,
		technologies: ["WordPress", "HTML", "CSS", "JavaScript", "PHP", "MySQL"],
		git: null,
		url: "https://sauloimoveisce.com.br",
	},
	{
		name: "servrent",
		photo: servrent.src,
		technologies: ["WordPress", "HTML", "CSS", "JavaScript", "PHP", "MySQL"],
		git: null,
		url: null,
	},
];
