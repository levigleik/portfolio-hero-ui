import { Image as ZoomableImage } from "@/components/ui/image";
import Image from "next/image";

export default function ProjectScreen({
	src,
	title,
	address,
	priority = false,
	zoomable = false,
	className = "",
}: {
	src: string;
	title: string;
	address: string;
	priority?: boolean;
	zoomable?: boolean;
	className?: string;
}) {
	return (
		<div className={`project-screen ${className}`}>
			<div className="screen-toolbar" aria-hidden="true">
				<span className="screen-dots">
					<i />
					<i />
					<i />
				</span>
				<span className="screen-address">{address}</span>
				<span className="screen-toolbar-end">↗</span>
			</div>
			{zoomable ? (
				<ZoomableImage
					src={src}
					alt={title}
					width={1440}
					height={720}
					priority={priority}
					sizes="(max-width: 700px) 95vw, 75vw"
					className="screen-image"
				/>
			) : (
				<Image
					src={src}
					alt={title}
					width={1440}
					height={720}
					priority={priority}
					sizes="(max-width: 700px) 95vw, 75vw"
					className="screen-image"
				/>
			)}
		</div>
	);
}
