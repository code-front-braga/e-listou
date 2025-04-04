'use client';

import { useContext } from 'react';
import { HistoryContext } from '../contexts/history';
import { Cart } from '@prisma/client';
import { History } from './history';

interface HistoriesListProps {
	carts: Cart[];
}

export function HistoriesList({ carts }: HistoriesListProps) {
	const { allCompletedCarts: filteredCarts } = useContext(HistoryContext);

	const historiesToDisplay = filteredCarts.length > 0 ? filteredCarts : carts;

	if (carts.length === 0) {
		return (
			<div className="text-cabaret self-start text-lg">
				No momento você não tem histórico de compras.
			</div>
		);
	}

	return (
		<div className="flex h-full w-full flex-col items-center justify-between overflow-hidden">
			<ul className="flex w-full flex-col gap-3 overflow-y-auto">
				{historiesToDisplay.map(history => (
					<History key={history.id} history={history} />
				))}
			</ul>
		</div>
	);
}
