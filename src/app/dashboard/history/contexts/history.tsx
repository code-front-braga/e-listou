'use client';

import { firstLetterToUpperCase } from '@/utils/first-letter-to-upper-case';
import { formatToDateBRL } from '@/utils/format-to-date-brl';
import { Cart } from '@prisma/client';
import { createContext, useState } from 'react';

interface IHistoryContext {
	allCompletedCarts: Cart[];
	setAllCompletedCarts: (allCompletedCarts: Cart[]) => void;

	isSearchButtonClicked: boolean;
	setIsSearchButtonClicked: (value: boolean) => void;

	searchPurchaseContext: (
		supermarketName: string,
		allcompletedCarts: Cart[],
	) => void;
	clearSearchPurchaseContext: (allcompletedCarts: Cart[]) => void;
}

export const HistoryContext = createContext<IHistoryContext>({
	allCompletedCarts: [],
	setAllCompletedCarts: () => {},

	isSearchButtonClicked: false,
	setIsSearchButtonClicked: () => {},

	searchPurchaseContext: () => {},
	clearSearchPurchaseContext: () => {},
});

export function HistoryProvider({ children }: { children: React.ReactNode }) {
	const [allCompletedCarts, setAllCompletedCarts] = useState<Cart[]>([]);
	const [isSearchButtonClicked, setIsSearchButtonClicked] = useState(false);

	const searchPurchaseContext = (
		supermarketName: string,
		completedCarts: Cart[],
	) => {
		setIsSearchButtonClicked(true);

		const filteredPurchase = completedCarts.filter(completedCart => {
			const supermarketNameMatch = firstLetterToUpperCase(
				completedCart.supermarket,
			).includes(firstLetterToUpperCase(supermarketName));

			const dateMatch = formatToDateBRL(completedCart.completedAt).includes(
				supermarketName,
			);

			return supermarketNameMatch || dateMatch;
		});

		setAllCompletedCarts(filteredPurchase);
		setIsSearchButtonClicked(false);
	};

	function clearSearchPurchaseContext(allCompletedCarts: Cart[]) {
		setAllCompletedCarts(allCompletedCarts);
		setIsSearchButtonClicked(true);
	}

	return (
		<HistoryContext.Provider
			value={{
				allCompletedCarts,
				setAllCompletedCarts,
				isSearchButtonClicked,
				setIsSearchButtonClicked,
				searchPurchaseContext,
				clearSearchPurchaseContext,
			}}
		>
			{children}
		</HistoryContext.Provider>
	);
}
