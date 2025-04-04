'use client';

import { formatToDateBRL } from '@/utils/format-to-date-brl';
import { Prisma } from '@prisma/client';

interface HeaderProps {
	cart: Prisma.CartGetPayload<{
		select: { supermarket: true; completedAt: true };
	}>;
}

export function Header({ cart }: HeaderProps) {
	return (
		<header className="text-christalle w-full">
			<h3 className="text-christalle">Detalhes da compra:</h3>
			<div className="flex items-center gap-1 text-sm">
				<span className="text-cabaret">Supermercado:</span>
				<span>{cart.supermarket}</span>
			</div>
			<div className="flex items-center gap-1 text-sm">
				<span className="text-cabaret">Data da Compra:</span>
				<span>{formatToDateBRL(cart.completedAt)}</span>
			</div>
		</header>
	);
}
