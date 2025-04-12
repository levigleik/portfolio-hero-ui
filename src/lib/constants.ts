import chronoStudy from "../assets/images/projects/chrono-study.png";
import sauloImoveis from "../assets/images/projects/saulo-imoveis.png";
import servrent from "../assets/images/projects/servrent.png";

export const PROJECT_TECHONOLOGIES = [
	{
		name: "chrono-study",
		photo: chronoStudy.src,
		techonologies: [
			"NextJS",
			"TailwindCSS",
			"shadcn/ui",
			"zod",
			"React Hook Form",
		],
		git: "https://github.com/levigleik/chrono-study",
		url: "https://chrono-study.vercel.app",
	},
	{
		name: "saulo-imoveis",
		photo: sauloImoveis.src,
		techonologies: ["WordPress", "HTML", "CSS", "JavaScript", "PHP", "MySQL"],
		git: null,
		url: "https://sauloimoveisce.com.br",
	},
	{
		name: "servrent",
		photo: servrent.src,
		techonologies: ["WordPress", "HTML", "CSS", "JavaScript", "PHP", "MySQL"],
		git: null,
		url: "http://servrent.com.br",
	},
	// {
	// 	name: "servrent2",
	// 	photo: servrent.src,
	// 	techonologies: ["WordPress", "HTML", "CSS", "JavaScript", "PHP", "MySQL"],
	// 	git: null,
	// 	url: "http://servrent.com.br",
	// },

	// {
	// 	name: "servrent3",
	// 	photo: servrent.src,
	// 	techonologies: ["WordPress", "HTML", "CSS", "JavaScript", "PHP", "MySQL"],
	// 	git: null,
	// 	url: "http://servrent.com.br",
	// },
];
