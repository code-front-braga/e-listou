'use client';

import { firstLetterToUpperCase } from '@/utils/first-letter-to-upper-case';
import { formatToDateBRL } from '@/utils/format-to-date-brl';
import { Cart } from '@prisma/client';
import { createContext, useState } from 'react';

interface IHistoryContext {
	allCompletedCarts: Cart[];
	setAllCompletedCarts: (carts: Cart[]) => void;

	isSearchButtonClicked: boolean;
	setIsSearchButtonClicked: (value: boolean) => void;

	searchPurchaseContext: (supermarketName: string, allCarts: Cart[]) => void;
	clearSearchPurchaseContext: (allCarts: Cart[]) => void;
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
	const [isSearchButtonClicked, setIsSearchButtonClicked] =
		useState<boolean>(false);

	const searchPurchaseContext = (supermarketName: string, allCarts: Cart[]) => {
		setIsSearchButtonClicked(true);

		const filteredPurchase = allCarts.filter(cart => {
			const supermarketNameMatch = firstLetterToUpperCase(
				cart.supermarket,
			).includes(firstLetterToUpperCase(supermarketName));

			const dateMatch = formatToDateBRL(cart.completedAt).includes(
				supermarketName,
			);

			return supermarketNameMatch || dateMatch;
		});

		setAllCompletedCarts(filteredPurchase);
		setIsSearchButtonClicked(false);
	};

	function clearSearchPurchaseContext(allCarts: Cart[]) {
		setAllCompletedCarts(allCarts);
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
