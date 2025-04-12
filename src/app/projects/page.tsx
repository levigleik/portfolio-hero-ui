import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Projetos",
};

export default function HomePage() {
	return (
		<div className="mt-4 flex flex-col items-center justify-center gap-4 font-sans lg:mt-10">
			Projects
		</div>
	);
}
