'use client';

import {
	Form,
	FormField,
	FormItem,
	FormControl,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SupermarketNameData, supermarketNameSchema } from '@/lib/zod/cart';
import { zodResolver } from '@hookform/resolvers/zod';
import { Cart } from '@prisma/client';
import { useContext, useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { IoClose } from 'react-icons/io5';
import { RiSearch2Fill } from 'react-icons/ri';
import { HistoryContext } from '../contexts/history';
import { toast } from 'sonner';

interface SearchCompletedCartProps {
	carts: Cart[];
}

export function SearchCompletedCart({ carts }: SearchCompletedCartProps) {
	const form = useForm<SupermarketNameData>({
		resolver: zodResolver(supermarketNameSchema),
		defaultValues: { supermarketName: '' },
	});
	const [isClearedButtonClicked, setIsClearedButtonClicked] =
		useState<boolean>(false);
	const {
		allCompletedCarts: filteredCarts,
		isSearchButtonClicked,
		searchPurchaseContext,
		clearSearchPurchaseContext,
	} = useContext(HistoryContext);
	const supermarketName = useWatch({
		control: form.control,
		name: 'supermarketName',
	});

	useEffect(() => {
		if (filteredCarts.length === 0 && isClearedButtonClicked) {
			toast.error('Ops!', {
				description:
					'Compra não encontrada. Verifique se digitou corretamente o nome do supermercado ou a data (dd/mm/aaaa)',
				position: 'top-center',
			});

			setIsClearedButtonClicked(false);
			form.reset();
		}
	}, [filteredCarts, setIsClearedButtonClicked]);

	useEffect(() => {
		if (supermarketName === '') {
			clearSearchPurchaseContext(carts);
			setIsClearedButtonClicked(false);
		}
	}, [supermarketName]);

	function handleSearchCart(data: SupermarketNameData) {
		console.log('search clicado');
		searchPurchaseContext(data.supermarketName, carts);
		setIsClearedButtonClicked(true);

		if (filteredCarts.length > 0 && !isSearchButtonClicked) {
			clearSearchPurchaseContext(carts);
			setIsClearedButtonClicked(false);

			form.reset();
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSearchCart)} className="w-full">
				<div className="flex items-center justify-between gap-3">
					<FormField
						control={form.control}
						name="supermarketName"
						render={({ field }) => (
							<FormItem className="relative w-full">
								<FormControl>
									<Input
										{...field}
										placeholder="Supermercado ou Data (DD/MM/AAAA)"
										className="font-gantari bg-moonRaker text-christalle flex-1 rounded p-2 indent-2 text-sm placeholder:text-white"
									/>
								</FormControl>
								<FormMessage className="absolute -bottom-5" />
							</FormItem>
						)}
					/>

					<button type="submit">
						{isClearedButtonClicked ? (
							<IoClose size={26} className="text-cabaret" />
						) : (
							<RiSearch2Fill size={26} className="text-christalle" />
						)}
					</button>
				</div>
			</form>
		</Form>
	);
}
