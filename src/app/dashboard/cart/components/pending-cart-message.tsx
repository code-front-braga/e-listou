'use client';

interface PendingCartProps {
	onClick: () => void;
}

export function PendingCartMessage({ onClick }: PendingCartProps) {
	return (
		<div className="mx-auto flex flex-col items-center justify-center gap-4">
			<h2 className="text-christalle font-semibold">
				Você tem uma compra em andamento!
			</h2>
			<p className="text-christalle text-center">
				Para criar uma nova lista, complete a compra atual.
			</p>
			<button
				onClick={onClick}
				className="bg-cabaret w-full rounded py-2 font-semibold text-white shadow-xl"
			>
				Continuar Compra Atual
			</button>
		</div>
	);
}
