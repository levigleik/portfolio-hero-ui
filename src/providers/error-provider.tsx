"use client";
import { Button } from "@heroui/button";
import { ErrorBoundary } from "react-error-boundary";

export function ErrorProvider({ children }: { children: React.ReactNode }) {
	return (
		<ErrorBoundary
			fallbackRender={({ resetErrorBoundary }) => (
				<div className="flex h-screen flex-col items-center justify-center">
					<h1 className="font-bold text-2xl">Ocorreu um erro</h1>
					<Button
						className="mt-4"
						onPress={() => {
							resetErrorBoundary();
						}}
					>
						Tentar novamente
					</Button>
				</div>
			)}
		>
			{children}
		</ErrorBoundary>
	);
}
