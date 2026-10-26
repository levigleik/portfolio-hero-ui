"use client";

import { cn } from "@heroui/theme";
import {
	ArrowLeft,
	Download,
	ExternalLink,
	Maximize,
	Minimize,
	X,
	ZoomIn,
	ZoomOut,
} from "lucide-react";
import NextImage from "next/image";
import { useTranslations } from "next-intl";
import {
	type ComponentProps,
	type PointerEvent as ReactPointerEvent,
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { createPortal } from "react-dom";

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.25;
const WHEEL_DELTA_PER_STEP = 50;

const OVERLAY_GUTTER = 32;
const STAGE_PADDING = 32;
const HEADER_HEIGHT = 72;
const MAX_STAGE_WIDTH = 1280;
const MAX_MODAL_HEIGHT_RATIO = 0.9;

const TOOLBAR_BUTTON_CLASS =
	"flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent dark:text-gray-300 dark:hover:bg-white/5";

interface Size {
	width: number;
	height: number;
}

function getAvailableStageSize(): Size {
	if (typeof window === "undefined") {
		return { width: 800, height: 600 };
	}
	if (document.fullscreenElement) {
		return { width: window.innerWidth, height: window.innerHeight };
	}
	return {
		width:
			Math.min(window.innerWidth - OVERLAY_GUTTER, MAX_STAGE_WIDTH) -
			STAGE_PADDING,
		height:
			window.innerHeight * MAX_MODAL_HEIGHT_RATIO -
			HEADER_HEIGHT -
			STAGE_PADDING,
	};
}

function getBaseSize(natural: Size | null, available: Size): Size | null {
	if (!natural || !(available.width > 0 && available.height > 0)) return null;
	const scale = Math.min(
		1,
		available.width / natural.width,
		available.height / natural.height,
	);
	return {
		width: Math.floor(natural.width * scale),
		height: Math.floor(natural.height * scale),
	};
}

function getDownloadFileName(url: string): string {
	const raw = url.split("?")[0]?.split("/").pop() ?? "";
	try {
		return decodeURIComponent(raw) || "image";
	} catch {
		return raw || "image";
	}
}

export interface ImageViewerProps {
	src: string;
	alt?: string;
	onClose: () => void;
}

export function ImageViewer({ src, alt = "", onClose }: ImageViewerProps) {
	const t = useTranslations("ImageViewer");
	const [naturalSize, setNaturalSize] = useState<Size | null>(null);
	const [availableSize, setAvailableSize] = useState(getAvailableStageSize);
	const [zoom, setZoom] = useState(MIN_ZOOM);
	const [isDragging, setIsDragging] = useState(false);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const stageRef = useRef<HTMLDivElement>(null);
	const imgRef = useRef<HTMLImageElement>(null);
	const previousZoomRef = useRef(zoom);
	const zoomAnchorRef = useRef<{ x: number; y: number } | null>(null);
	const dragStartRef = useRef<{
		x: number;
		y: number;
		scrollLeft: number;
		scrollTop: number;
	} | null>(null);

	useLayoutEffect(() => {
		const img = imgRef.current;
		if (img && img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
			setNaturalSize({ width: img.naturalWidth, height: img.naturalHeight });
		}
	}, [src]);

	useEffect(() => {
		const handleResize = () => setAvailableSize(getAvailableStageSize());
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = previousOverflow;
		};
	}, []);

	useEffect(() => {
		const handleFullscreenChange = () => {
			setIsFullscreen(document.fullscreenElement === stageRef.current);
			setAvailableSize(getAvailableStageSize());
		};
		document.addEventListener("fullscreenchange", handleFullscreenChange);
		return () => {
			document.removeEventListener("fullscreenchange", handleFullscreenChange);
			if (document.fullscreenElement) void document.exitFullscreen?.();
		};
	}, []);

	const toggleFullscreen = () => {
		if (document.fullscreenElement) {
			void document.exitFullscreen?.();
			return;
		}
		void stageRef.current?.requestFullscreen?.().catch(() => {
			// Browser denied fullscreen; keep viewing inside modal.
		});
	};

	const baseSize = getBaseSize(naturalSize, availableSize);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key !== "Escape") return;
			event.stopPropagation();
			onClose();
		};
		window.addEventListener("keydown", handleKeyDown, true);
		return () => window.removeEventListener("keydown", handleKeyDown, true);
	}, [onClose]);

	useLayoutEffect(() => {
		const stage = stageRef.current;
		const ratio = zoom / previousZoomRef.current;
		const anchor = zoomAnchorRef.current ?? {
			x: (stage?.clientWidth ?? 0) / 2,
			y: (stage?.clientHeight ?? 0) / 2,
		};
		previousZoomRef.current = zoom;
		zoomAnchorRef.current = null;
		if (!stage || ratio === 1) return;
		stage.scrollLeft = (stage.scrollLeft + anchor.x) * ratio - anchor.x;
		stage.scrollTop = (stage.scrollTop + anchor.y) * ratio - anchor.y;
	}, [zoom]);

	useEffect(() => {
		const stage = stageRef.current;
		if (!stage) return;
		let accumulatedDelta = 0;
		const handleWheel = (event: WheelEvent) => {
			event.preventDefault();
			accumulatedDelta += event.deltaY;
			if (Math.abs(accumulatedDelta) < WHEEL_DELTA_PER_STEP) return;
			const direction = accumulatedDelta < 0 ? 1 : -1;
			accumulatedDelta = 0;
			const currentZoom = previousZoomRef.current;
			const nextZoom = Math.min(
				MAX_ZOOM,
				Math.max(MIN_ZOOM, currentZoom + direction * ZOOM_STEP),
			);
			if (nextZoom === currentZoom) return;
			const rect = stage.getBoundingClientRect();
			zoomAnchorRef.current = {
				x: event.clientX - rect.left,
				y: event.clientY - rect.top,
			};
			setZoom(nextZoom);
		};
		stage.addEventListener("wheel", handleWheel, { passive: false });
		return () => stage.removeEventListener("wheel", handleWheel);
	}, []);

	const canDrag = zoom > MIN_ZOOM;

	const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
		const stage = stageRef.current;
		if (!canDrag || !stage || e.button !== 0) return;
		e.preventDefault();
		stage.setPointerCapture?.(e.pointerId);
		dragStartRef.current = {
			x: e.clientX,
			y: e.clientY,
			scrollLeft: stage.scrollLeft,
			scrollTop: stage.scrollTop,
		};
		setIsDragging(true);
	};

	const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
		const stage = stageRef.current;
		const start = dragStartRef.current;
		if (!stage || !start) return;
		stage.scrollLeft = start.scrollLeft - (e.clientX - start.x);
		stage.scrollTop = start.scrollTop - (e.clientY - start.y);
	};

	const handlePointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
		if (!dragStartRef.current) return;
		stageRef.current?.releasePointerCapture?.(e.pointerId);
		dragStartRef.current = null;
		setIsDragging(false);
	};

	const zoomOut = () => setZoom((z) => Math.max(MIN_ZOOM, z - ZOOM_STEP));
	const zoomIn = () => setZoom((z) => Math.min(MAX_ZOOM, z + ZOOM_STEP));
	const zoomPercent = Math.round(zoom * 100);

	const handleDownload = () => {
		const link = document.createElement("a");
		link.href = src;
		link.download = getDownloadFileName(src);
		document.body.appendChild(link);
		link.click();
		link.remove();
	};

	if (typeof document === "undefined") return null;

	return createPortal(
		<div
			className="fixed inset-0 z-[999] flex items-center justify-center p-4 modal"
			onClick={(e) => e.stopPropagation()}
		>
			<div
				className="fixed inset-0 h-full w-full bg-gray-400/50 backdrop-blur-sm dark:bg-black/60"
				onClick={onClose}
			/>
			<div
				role="dialog"
				aria-modal="true"
				aria-label={alt || "Image"}
				className="relative flex max-h-[90dvh] w-auto max-w-full flex-col rounded-3xl bg-white shadow-2xl transition-all duration-300 dark:bg-gray-900"
				style={{ overflow: "hidden" }}
				onClick={(e) => e.stopPropagation()}
			>
				<button
					onClick={onClose}
					type="button"
					aria-label={t("close")}
					title={t("close")}
					className="absolute top-3 right-3 z-[999] flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 sm:top-4 sm:right-4"
				>
					<X className="size-5" aria-hidden="true" />
				</button>

				<div className="shrink-0 pr-12">
					<div className="flex h-18 items-center justify-end gap-1 pr-3 pl-4 sm:pr-4">
						<button
							type="button"
							onClick={zoomOut}
							disabled={zoom <= MIN_ZOOM}
							aria-label={t("zoom-out")}
							title={t("zoom-out")}
							className={TOOLBAR_BUTTON_CLASS}
						>
							<ZoomOut className="size-5" />
						</button>
						<span
							data-testid="image-viewer-zoom"
							className="w-12 text-center text-sm font-medium text-gray-700 tabular-nums dark:text-gray-300"
						>
							{zoomPercent}%
						</span>
						<button
							type="button"
							onClick={zoomIn}
							disabled={zoom >= MAX_ZOOM}
							aria-label={t("zoom-in")}
							title={t("zoom-in")}
							className={TOOLBAR_BUTTON_CLASS}
						>
							<ZoomIn className="size-5" />
						</button>
						<button
							type="button"
							onClick={toggleFullscreen}
							aria-label={
								isFullscreen ? t("exit-fullscreen") : t("fullscreen")
							}
							title={isFullscreen ? t("exit-fullscreen") : t("fullscreen")}
							className={TOOLBAR_BUTTON_CLASS}
						>
							{isFullscreen ? (
								<Minimize className="size-5" />
							) : (
								<Maximize className="size-5" />
							)}
						</button>
						<a
							href={src}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={t("open-new-tab")}
							title={t("open-new-tab")}
							className={TOOLBAR_BUTTON_CLASS}
						>
							<ExternalLink className="size-5" />
						</a>
						<button
							type="button"
							onClick={handleDownload}
							aria-label={t("download")}
							title={t("download")}
							className={TOOLBAR_BUTTON_CLASS}
						>
							<Download className="size-5" />
						</button>
					</div>
				</div>

				<div className="min-h-0 flex-1 overflow-hidden">
					<div className="flex justify-center px-4 pb-4">
						<div
							ref={stageRef}
							data-testid="image-viewer-stage"
							onPointerDown={handlePointerDown}
							onPointerMove={handlePointerMove}
							onPointerUp={handlePointerUp}
							onPointerCancel={handlePointerUp}
							className={cn(
								"no-scrollbar flex min-h-40 min-w-60 touch-none overflow-auto",
								isFullscreen ? "bg-black" : "rounded-xl",
								canDrag ? (isDragging ? "cursor-grabbing" : "cursor-grab") : "",
							)}
							style={
								baseSize
									? { width: baseSize.width, height: baseSize.height }
									: undefined
							}
						>
							{isFullscreen && (
								<button
									type="button"
									onClick={toggleFullscreen}
									onPointerDown={(e) => e.stopPropagation()}
									title={t("exit-fullscreen")}
									className="fixed top-4 right-4 z-10 flex h-10 cursor-pointer items-center gap-2 rounded-full bg-gray-900/90 px-4 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:bg-gray-700 motion-reduce:transition-none"
								>
									<ArrowLeft className="size-5" aria-hidden="true" />
									{t("back")}
								</button>
							)}
							<img
								ref={imgRef}
								src={src}
								alt={alt || "Imagem"}
								draggable={false}
								onLoad={(e) =>
									setNaturalSize({
										width: e.currentTarget.naturalWidth,
										height: e.currentTarget.naturalHeight,
									})
								}
								style={
									baseSize
										? {
												width: baseSize.width * zoom,
												height: baseSize.height * zoom,
											}
										: undefined
								}
								className={`m-auto max-w-none shrink-0 select-none ${baseSize ? "" : "invisible"}`}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>,
		document.body,
	);
}

type ImageProps = Omit<
	ComponentProps<typeof NextImage>,
	"src" | "alt" | "width" | "height"
> & {
	src: string;
	alt?: string;
	width?: number;
	height?: number;
};

export function Image({
	src,
	alt,
	className,
	onClick,
	style,
	width = 480,
	height = 360,
	priority,
	loading,
	...props
}: ImageProps) {
	const [isOpen, setIsOpen] = useState(false);
	const closeViewer = useCallback(() => setIsOpen(false), []);

	return (
		<>
			<NextImage
				{...props}
				src={src}
				alt={alt ?? ""}
				draggable={false}
				style={style}
				width={width}
				height={height}
				priority={priority}
				loading={priority ? undefined : (loading ?? "lazy")}
				className={cn("cursor-zoom-in", className)}
				onClick={(event) => {
					onClick?.(event);

					if (!event.defaultPrevented) {
						setIsOpen(true);
					}
				}}
			/>

			{isOpen && <ImageViewer src={src} alt={alt} onClose={closeViewer} />}
		</>
	);
}
