import { Button } from "@heroui/button";
import {
	Image as HeroUIImage,
	ImageProps as HeroUIImageProps,
} from "@heroui/image";
import { Modal, ModalContent, ModalFooter } from "@heroui/modal";
import { useCallback, useEffect, useRef, useState } from "react";
import {
	FaArrowRightArrowLeft, // Usado para Flip Horizontal
	FaArrowRotateLeft,
	FaArrowRotateRight,
} from "react-icons/fa6";
import { FiZoomIn, FiZoomOut } from "react-icons/fi";
import { TbArrowsDiagonal } from "react-icons/tb"; // Ícone sugerido para Flip Vertical

interface ImageProps extends HeroUIImageProps {
	link: string;
}

// Constantes para limites e passos
const MAX_ZOOM = 3;
const MIN_ZOOM = 1;
const ZOOM_STEP_WHEEL = 0.1;
const ZOOM_STEP_BUTTON = 0.2; // Um passo um pouco maior para botões
const ROTATION_STEP = 90; // Girar de 90 em 90 graus

export default function Image({ src, alt, link, ...props }: ImageProps) {
	const [isOpen, setIsOpen] = useState(false);

	// Estados de Transformação
	const [scale, setScale] = useState(MIN_ZOOM);
	const [translate, setTranslate] = useState({ x: 0, y: 0 });
	const [rotation, setRotation] = useState(0);
	const [scaleAxis, setScaleAxis] = useState({ x: 1, y: 1 });

	const imageRef = useRef<HTMLImageElement | null>(null);

	// --- Handlers de Transformação ---

	const handleFlipVertical = () => {
		setScaleAxis((prev) => ({ ...prev, y: prev.y * -1 }));
	};

	const handleFlipHorizontal = () => {
		setScaleAxis((prev) => ({ ...prev, x: prev.x * -1 }));
	};

	const handleRotateLeft = () => {
		setRotation((prev) => prev - ROTATION_STEP);
	};

	const handleRotateRight = () => {
		setRotation((prev) => prev + ROTATION_STEP);
	};

	// Função auxiliar para zoom (usada por botões e potencialmente roda do mouse)
	// Centraliza o zoom se não houver coordenadas do mouse
	const applyZoom = (newScale: number, mouseX?: number, mouseY?: number) => {
		const imgElement = imageRef.current;
		let centerX = 0;
		let centerY = 0;

		if (imgElement) {
			// Usa o centro da imagem se as coordenadas do mouse não forem fornecidas
			centerX = mouseX ?? imgElement.offsetWidth / 2;
			centerY = mouseY ?? imgElement.offsetHeight / 2;
		}

		// Calcula a nova translação para manter o ponto (centerX, centerY) fixo
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
			// Reset ao atingir o mínimo pelo botão
			setScale(MIN_ZOOM);
			setTranslate({ x: 0, y: 0 });
			// Opcional: resetar rotação/flip ao resetar zoom? Decidi não resetar aqui.
			// setRotation(0);
			// setScaleAxis({ x: 1, y: 1 });
		} else {
			applyZoom(potentialScale); // Zoom out centralizado
		}
	};

	const handleZoomIn = () => {
		const newScale = Math.min(scale + ZOOM_STEP_BUTTON, MAX_ZOOM);
		if (newScale !== scale) {
			applyZoom(newScale); // Zoom in centralizado
		}
	};

	// Handler da Roda do Mouse (agora usa applyZoom com coords do mouse)
	const handleWheel = useCallback(
		(event: WheelEvent) => {
			event.preventDefault();
			const imgElement = imageRef.current;
			if (!imgElement) return;

			const rect = imgElement.getBoundingClientRect();
			const mouseX = event.clientX - rect.left;
			const mouseY = event.clientY - rect.top;

			if (event.deltaY < 0) {
				// Zoom In
				const newScale = Math.min(scale + ZOOM_STEP_WHEEL, MAX_ZOOM);
				if (newScale !== scale) {
					applyZoom(newScale, mouseX, mouseY); // Passa coords do mouse
				}
			} else {
				// Zoom Out
				const potentialScale = scale - ZOOM_STEP_WHEEL;
				if (potentialScale <= MIN_ZOOM) {
					// Reset se atingir o mínimo pela roda do mouse
					if (scale !== MIN_ZOOM || translate.x !== 0 || translate.y !== 0) {
						setScale(MIN_ZOOM);
						setTranslate({ x: 0, y: 0 });
					}
				} else {
					applyZoom(potentialScale, mouseX, mouseY); // Passa coords do mouse
				}
			}
		},
		[scale, translate, applyZoom], // Adiciona applyZoom às dependências
	);

	// --- UseEffects ---

	// Adiciona/Remove listener da roda do mouse
	useEffect(() => {
		const imgElement = imageRef.current;
		if (isOpen && imgElement) {
			imgElement.addEventListener("wheel", handleWheel, { passive: false });
			return () => {
				imgElement.removeEventListener("wheel", handleWheel);
			};
		}
	}, [isOpen, handleWheel]); // handleWheel está incluso agora

	// Resetar todas as transformações ao fechar o modal
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
		// Dependências para garantir o reset correto
	}, [isOpen, scale, translate, rotation, scaleAxis]);

	// --- Renderização ---

	// Monta a string de transformação CSS
	const transformStyle = `
    translate3d(${translate.x}px, ${translate.y}px, 0px)
    rotate(${rotation}deg)
    scale3d(${scale * scaleAxis.x}, ${scale * scaleAxis.y}, 1)
  `;

	return (
		<>
			{/* Imagem pequena clicável */}
			<HeroUIImage
				{...props}
				src={src}
				alt={alt}
				className="cursor-pointer"
				onClick={() => setIsOpen(true)}
			/>

			{/* Modal */}
			<Modal
				isOpen={isOpen}
				size="5xl"
				onOpenChange={setIsOpen}
				hideCloseButton
				placement="center"
				backdrop="blur" // Mantido blur
				classNames={{
					base: "border-none shadow-none bg-transparent", // Fundo do modal transparente
				}}
			>
				<ModalContent className="bg-transparent p-0 overflow-hidden flex flex-col items-center">
					{/* Container para a Imagem (útil para centralizar e aplicar overflow se necessário) */}
					<div className="w-full h-full flex items-center justify-center overflow-hidden">
						<HeroUIImage
							src={src}
							alt={alt}
							ref={imageRef}
							style={{
								transform: transformStyle,
								transformOrigin: "top left", // Mantido para consistência com cálculos
								cursor: scale > MIN_ZOOM ? "grab" : "zoom-in",
								maxWidth: "none", // Essencial para zoom/pan
								maxHeight: "none", // Essencial para zoom/pan
								transition: "transform 0.15s ease-out", // Leve ajuste na suavidade
								willChange: "transform", // Dica de otimização para o navegador
							}}
							className="object-contain" // object-contain para manter proporção inicial
							// className="w-full object-contain" // w-full pode restringir se a imagem for alta
						/>
					</div>

					{/* Barra de Ferramentas */}
					<ModalFooter className="bg-white/80 backdrop-blur-sm rounded-full w-auto max-w-[90%] sm:max-w-[60%] lg:max-w-[40%] justify-center shadow-small mx-auto mt-4 z-50 p-2">
						{/* Botão Flip Vertical */}
						<Button
							variant="bordered"
							radius="full"
							isIconOnly
							aria-label="Inverter Verticalmente"
							onClick={handleFlipVertical}
						>
							{/* Usando TbArrowsDiagonal como sugestão, ou mantenha o rotate-90 */}
							<TbArrowsDiagonal size={18} />
							{/* <FaArrowRightArrowLeft className="rotate-90" /> */}
						</Button>

						{/* Botão Flip Horizontal */}
						<Button
							variant="bordered"
							radius="full"
							isIconOnly
							aria-label="Inverter Horizontalmente"
							onClick={handleFlipHorizontal}
						>
							<FaArrowRightArrowLeft />
						</Button>

						{/* Botão Rotacionar Esquerda */}
						<Button
							variant="bordered"
							radius="full"
							isIconOnly
							aria-label="Rotacionar Esquerda"
							onClick={handleRotateLeft}
						>
							<FaArrowRotateLeft />
						</Button>

						{/* Botão Rotacionar Direita */}
						<Button
							variant="bordered"
							radius="full"
							isIconOnly
							aria-label="Rotacionar Direita"
							onClick={handleRotateRight}
						>
							<FaArrowRotateRight />
						</Button>

						{/* Botão Diminuir Zoom */}
						<Button
							variant="bordered"
							radius="full"
							isIconOnly
							aria-label="Diminuir Zoom"
							// Desabilitado se a escala já está no mínimo
							isDisabled={scale <= MIN_ZOOM}
							onClick={handleZoomOut}
						>
							<FiZoomOut size={20} />
						</Button>

						{/* Botão Aumentar Zoom */}
						<Button
							variant="bordered"
							radius="full"
							isIconOnly
							aria-label="Aumentar Zoom"
							// Desabilitado se a escala já está no máximo
							isDisabled={scale >= MAX_ZOOM}
							onClick={handleZoomIn}
						>
							<FiZoomIn size={20} />
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
