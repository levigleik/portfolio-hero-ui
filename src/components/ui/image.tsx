import {
	Image as HeroUIImage,
	ImageProps as HeroUIImageProps,
} from "@heroui/image";
import { Modal, ModalBody, ModalContent } from "@heroui/modal";
import { useState } from "react";

interface ImageProps extends HeroUIImageProps {
	link: string;
}

export default function Image({ src, alt, link, ...props }: ImageProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<HeroUIImage
				{...props}
				src={src}
				alt={alt}
				className="cursor-pointer"
				onClick={() => setIsOpen(true)}
			/>
			<Modal
				isOpen={isOpen}
				size="2xl"
				onOpenChange={setIsOpen}
				hideCloseButton
				placement="center"
			>
				<ModalContent>
					<ModalBody>
						<HeroUIImage
							src={src}
							alt={alt}
							className="w-full h-auto"
							onClick={() => (window.location.href = link)}
						/>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
