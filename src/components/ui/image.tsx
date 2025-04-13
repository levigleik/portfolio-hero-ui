import { Button } from "@heroui/button";
import {
	Image as HeroUIImage,
	ImageProps as HeroUIImageProps,
} from "@heroui/image";
import { Modal, ModalContent, ModalFooter } from "@heroui/modal";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import {} from "react-icons/fa6";
import { FiZoomIn, FiZoomOut } from "react-icons/fi";

interface ImageProps extends HeroUIImageProps {
	// link: string | null;
}

const MAX_ZOOM = 3;
const MIN_ZOOM = 1;
const ZOOM_STEP_WHEEL = 0.1;
const ZOOM_STEP_BUTTON = 0.2;
// const ROTATION_STEP = 90;

export default function Image({ src, alt, ...props }: ImageProps) {
	const [isOpen, setIsOpen] = useState(false);

	// Estados de Transformação
	const [scale, setScale] = useState(MIN_ZOOM);
	const [translate, setTranslate] = useState({ x: 0, y: 0 });
	const [rotation, setRotation] = useState(0);
	const [scaleAxis, setScaleAxis] = useState({ x: 1, y: 1 });

	const imageRef = useRef<HTMLImageElement | null>(null);

	// const handleFlipVertical = () => {
	// 	setScaleAxis((prev) => ({ ...prev, y: prev.y * -1 }));
	// };

	// const handleFlipHorizontal = () => {
	// 	setScaleAxis((prev) => ({ ...prev, x: prev.x * -1 }));
	// };

	// const handleRotateLeft = () => {
	// 	setRotation((prev) => prev - ROTATION_STEP);
	// };

	// const handleRotateRight = () => {
	// 	setRotation((prev) => prev + ROTATION_STEP);
	// };

	const applyZoom = (newScale: number, mouseX?: number, mouseY?: number) => {
		const imgElement = imageRef.current;
		let centerX = 0;
		let centerY = 0;

		if (imgElement) {
			centerX = mouseX ?? imgElement.offsetWidth / 2;
			centerY = mouseY ?? imgElement.offsetHeight / 2;
		}

		const newTranslateX =
			centerX - ((centerX - translate.x) / scale) * newScale;
		const newTranslateY =
			centerY - ((centerY - translate.y) / scale) * newScale;

		setScale(newScale);
		setTranslate({ x: newTranslateX, y: newTranslateY });
	};

	const handleZoomOut = () => {
		const potentialScale = scale - ZOOM_STEP_BUTTON;

		if (potentialScale <= MIN_ZOOM) {
			setScale(MIN_ZOOM);
			setTranslate({ x: 0, y: 0 });
			// setRotation(0);
			// setScaleAxis({ x: 1, y: 1 });
		} else {
			applyZoom(potentialScale);
		}
	};

	const handleZoomIn = () => {
		const newScale = Math.min(scale + ZOOM_STEP_BUTTON, MAX_ZOOM);
		if (newScale !== scale) {
			applyZoom(newScale);
		}
	};

	const handleWheel = useCallback(
		(event: WheelEvent) => {
			event.preventDefault();
			const imgElement = imageRef.current;
			if (!imgElement) return;

			const rect = imgElement.getBoundingClientRect();
			const mouseX = event.clientX - rect.left;
			const mouseY = event.clientY - rect.top;

			if (event.deltaY < 0) {
				const newScale = Math.min(scale + ZOOM_STEP_WHEEL, MAX_ZOOM);
				if (newScale !== scale) {
					applyZoom(newScale, mouseX, mouseY);
				}
			} else {
				const potentialScale = scale - ZOOM_STEP_WHEEL;
				if (potentialScale <= MIN_ZOOM) {
					if (scale !== MIN_ZOOM || translate.x !== 0 || translate.y !== 0) {
						setScale(MIN_ZOOM);
						setTranslate({ x: 0, y: 0 });
					}
				} else {
					applyZoom(potentialScale, mouseX, mouseY);
				}
			}
		},
		[scale, translate, applyZoom],
	);

	useEffect(() => {
		const imgElement = imageRef.current;
		if (isOpen && imgElement) {
			imgElement.addEventListener("wheel", handleWheel, { passive: false });
			return () => {
				imgElement.removeEventListener("wheel", handleWheel);
			};
		}
	}, [isOpen, handleWheel]);

	useEffect(() => {
		if (!isOpen) {
			const isTransformed =
				scale !== MIN_ZOOM ||
				translate.x !== 0 ||
				translate.y !== 0 ||
				rotation !== 0 ||
				scaleAxis.x !== 1 ||
				scaleAxis.y !== 1;

			if (isTransformed) {
				setScale(MIN_ZOOM);
				setTranslate({ x: 0, y: 0 });
				setRotation(0);
				setScaleAxis({ x: 1, y: 1 });
			}
		}
	}, [isOpen, scale, translate, rotation, scaleAxis]);

	const transformStyle = `
		translate3d(${translate.x}px, ${translate.y}px, 0px)
		rotate(${rotation}deg)
		scale3d(${scale * scaleAxis.x}, ${scale * scaleAxis.y}, 1)
	`;

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
				size="5xl"
				onOpenChange={setIsOpen}
				placement="center"
				backdrop="blur"
				classNames={{
					base: "border-none shadow-none",
				}}
				scrollBehavior="inside"
			>
				<ModalContent className="bg-transparent p-0 ">
					<HeroUIImage
						src={src}
						alt={alt}
						ref={imageRef}
						width={1500}
						style={{
							transform: transformStyle,
							transformOrigin: "top left",
							cursor: scale > MIN_ZOOM ? "grab" : "zoom-in",
							maxWidth: "none",
							maxHeight: "none",
							transition: "transform 0.15s ease-out",
							willChange: "transform",
						}}
						className="object-cover w-full"
					/>
					<ModalFooter className="rounded-full w-fit justify-center mx-auto mt-4 z-50">
						{/* <Button
							variant="bordered"
							radius="full"
							isIconOnly
							onPress={handleFlipVertical}
						>
							<FaArrowRightArrowLeft className="rotate-90" />
						</Button>
						<Button
							variant="bordered"
							radius="full"
							isIconOnly
							onPress={handleFlipHorizontal}
						>
							<FaArrowRightArrowLeft />
						</Button>
						<Button
							variant="bordered"
							radius="full"
							isIconOnly
							onPress={handleRotateLeft}
						>
							<FaArrowRotateLeft />
						</Button>
						<Button
							variant="bordered"
							radius="full"
							isIconOnly
							onPress={handleRotateRight}
						>
							<FaArrowRotateRight />
						</Button> */}
						<Button
							variant="bordered"
							radius="full"
							isIconOnly
							isDisabled={scale === 1 || translate.x === 0 || translate.y == 0}
							onPress={handleZoomOut}
						>
							<FiZoomOut size={20} />
						</Button>
						<Button
							variant="bordered"
							radius="full"
							isIconOnly
							onPress={handleZoomIn}
						>
							<FiZoomIn size={20} />
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
