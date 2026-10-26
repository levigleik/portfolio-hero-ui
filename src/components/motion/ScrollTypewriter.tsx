"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";

type TextLine = {
	text: string;
	left: number;
	top: number;
	width: number;
	height: number;
	start: number;
	end: number;
};

function RevealedLine({
	line,
	progress,
}: {
	line: TextLine;
	progress: MotionValue<number>;
}) {
	const width = useTransform(progress, [line.start, line.end], [0, line.width]);
	const opacity = useTransform(progress, (value) =>
		value >= line.start && value < line.end ? 1 : 0,
	);
	return (
		<span
			className="typewriter-line"
			style={{
				left: line.left,
				top: line.top,
				width: line.width,
				height: line.height,
				lineHeight: `${line.height}px`,
			}}
		>
			<motion.span className="typewriter-ink" style={{ width }}>
				{line.text}
			</motion.span>
			<motion.span
				className="typewriter-caret"
				style={{ left: width, opacity }}
			/>
		</span>
	);
}

/** Clip real, browser-wrapped lines so the caret follows proportional glyphs and resizing. */
export default function ScrollTypewriter({
	text,
	progress,
	enabled,
}: {
	text: string;
	progress: MotionValue<number>;
	enabled: boolean;
}) {
	const source = useRef<HTMLSpanElement>(null);
	const [lines, setLines] = useState<TextLine[]>([]);

	useLayoutEffect(() => {
		const element = source.current;
		if (!element) return;
		let mounted = true;
		const measure = () => {
			if (!mounted || !element.firstChild || !element.offsetWidth) return;
			const textNode = element.firstChild;
			const sourceRect = element.getBoundingClientRect();
			// A parent is scaling with scroll; measurements must stay in local layout pixels.
			const scale = sourceRect.width / element.offsetWidth || 1;
			const lineHeight = Number.parseFloat(
				getComputedStyle(element).lineHeight,
			);
			const rows: {
				start: number;
				end: number;
				left: number;
				right: number;
				y: number;
			}[] = [];
			const range = document.createRange();
			let offset = 0;
			for (const character of Array.from(text)) {
				const start = offset;
				offset += character.length;
				if (/\s/.test(character)) continue;
				range.setStart(textNode, start);
				range.setEnd(textNode, offset);
				const rect = range.getBoundingClientRect();
				const row = rows.find(
					(item) => Math.abs(item.y - rect.top) < 2 * scale,
				);
				if (row) {
					row.end = offset;
					row.right = rect.right;
				} else {
					rows.push({
						start,
						end: offset,
						left: rect.left,
						right: rect.right,
						y: rect.top,
					});
				}
			}
			const widths = rows.map((row) => (row.right - row.left) / scale);
			const totalWidth = widths.reduce((total, width) => total + width, 0);
			if (!totalWidth) return;
			let advance = 0;
			setLines(
				rows.map((row, index) => {
					const start = advance / totalWidth;
					advance += widths[index];
					return {
						text: text.slice(row.start, row.end),
						left: (row.left - sourceRect.left) / scale,
						top: index * lineHeight,
						width: widths[index],
						height: lineHeight,
						start,
						end: advance / totalWidth,
					};
				}),
			);
		};
		measure();
		const resize = new ResizeObserver(measure);
		resize.observe(element);
		document.fonts.ready.then(measure);
		document.fonts.addEventListener("loadingdone", measure);
		return () => {
			mounted = false;
			resize.disconnect();
			document.fonts.removeEventListener("loadingdone", measure);
		};
	}, [text]);

	return (
		<span
			className={`scroll-typewriter ${enabled ? "is-typing" : ""}`}
			aria-hidden="true"
		>
			<span ref={source} className="typewriter-placeholder">
				{text}
			</span>
			{enabled &&
				lines.map((line, index) => (
					<RevealedLine
						key={`${text}-${index}`}
						line={line}
						progress={progress}
					/>
				))}
		</span>
	);
}
