'use client';

import { useContext } from 'react';
import { FaCartPlus } from 'react-icons/fa';
import { CartContext } from '../contexts/cart';
import { formatToCurrencyBRL } from '@/utils/format-to-currency-brl';
import { firstLetterToUpperCase } from '@/utils/first-letter-to-upper-case';

export function AddItemsHeader() {
	const { supermarketName, openAddItemForm, items, total } =
		useContext(CartContext);

	return (
		<div className="flex w-full items-center justify-between">
			<span className="text-christalle flex-1 font-semibold">
				{firstLetterToUpperCase(supermarketName)}
			</span>

			<button
				type="button"
				onClick={openAddItemForm}
				className="text-cabaret flex flex-1 flex-col items-center"
			>
				<FaCartPlus size={26} />
				<p className="text-xs">Add Item</p>
			</button>

			<div className="flex flex-1 flex-col items-end">
				<p className="text-christalle font-semibold">Total</p>
				<span className="text-cabaret bg-moonRaker rounded px-1.5 font-semibold">
					{items.length === 0 ? 'R$ 0,00' : formatToCurrencyBRL(total)}
				</span>
			</div>
		</div>
	);
}
