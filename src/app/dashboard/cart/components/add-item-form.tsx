'use client';

import { useContext, useState } from 'react';
import { CartContext } from '../contexts/cart';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AnimatePresence, motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { formatToCurrencyBRL } from '@/utils/format-to-currency-brl';
import { AddNewItemData, addNewItemSchema } from '@/lib/zod/cart';
import { zodResolver } from '@hookform/resolvers/zod';
import { addItem } from '../../actions/add-item';
import { showPromiseToast } from '@/components/promise-toast';

export function AddItemForm() {
	const form = useForm<AddNewItemData>({
		resolver: zodResolver(addNewItemSchema),
		defaultValues: {
			productName: '',
			unitPrice: 0,
			quantity: 0,
		},
	});
	const { addItemFormOpen, closeAddItemForm, addNewItemContext } =
		useContext(CartContext);
	const [addItemLoading, setAddItemLoading] = useState<boolean>(false);

	async function handleAddNewItem(data: AddNewItemData) {
		setAddItemLoading(true);

		const resPromise = addItem({ ...data });
		showPromiseToast({
			loading: 'Adicionando...',
			promise: resPromise,
		});

		try {
			const res = await resPromise;
			if (res.success) {
				addNewItemContext(res.newItem);
				closeAddItemForm();
				form.reset();
			}
		} catch (error) {
			console.error('Ocorreu um erro ao adicionar o item.', error);
		} finally {
			setAddItemLoading(false);
		}
	}

	function handleCloseAddItemForm() {
		form.reset();
		closeAddItemForm();
	}

	return (
		<AnimatePresence>
			{addItemFormOpen && (
				<motion.div
					initial={{ y: -100, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: -100, opacity: 0 }}
					transition={{ type: 'tween', ease: 'anticipate' }}
					className="bg-christalle absolute top-1/2 left-1/2 w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-lg p-2 shadow-xl"
				>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(handleAddNewItem)}
							className="flex h-full flex-col gap-8 rounded p-2"
						>
							<FormField
								control={form.control}
								name="productName"
								render={({ field }) => (
									<FormItem className="relative">
										<FormLabel className="text-moonRaker">
											Nome do Produto
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="Insira o nome do produto"
												className="font-gantari bg-moonRaker text-christalle rounded p-2 indent-2 text-sm placeholder:text-white"
											/>
										</FormControl>
										<FormMessage className="absolute -bottom-5" />
									</FormItem>
								)}
							/>

							<div className="relative flex w-full items-center gap-4">
								<FormField
									control={form.control}
									name="unitPrice"
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel className="text-moonRaker">
												Preço Unitário
											</FormLabel>
											<FormControl>
												<Input
													type="text"
													value={
														field.value ? formatToCurrencyBRL(field.value) : ''
													}
													onChange={e => {
														const rawValue = e.target.value.replace(/\D/g, '');

														if (!rawValue) {
															field.onChange('');
															return;
														}

														const numericValue = Number(rawValue) / 100;
														field.onChange(numericValue);
													}}
													placeholder="R$ 0,00"
													className="font-gantari bg-moonRaker text-christalle rounded p-2 indent-2 text-sm placeholder:text-white"
												/>
											</FormControl>
											<FormMessage className="absolute -bottom-5" />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="quantity"
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel className="text-moonRaker">
												Quantidade
											</FormLabel>
											<FormControl>
												<Input
													type="number"
													{...field}
													placeholder="Quantidade"
													className="font-gantari bg-moonRaker text-christalle rounded p-2 indent-2 text-sm placeholder:text-white"
												/>
											</FormControl>
											<FormMessage className="absolute -bottom-5" />
										</FormItem>
									)}
								/>
							</div>
							<div className="mt-3 flex gap-2.5">
								<Button
									type="submit"
									className="bg-cadetBlue font-gantari hover:bg-cadetBlue/85 mt-1.5 w-full flex-1 cursor-pointer rounded py-2.5 text-sm text-white"
								>
									{addItemLoading ? 'Adicionando Item...' : 'Adicionar Item'}
								</Button>
								<Button
									type="button"
									onClick={handleCloseAddItemForm}
									className="bg-cabaret font-gantari mt-1.5 w-full flex-1 cursor-pointer rounded py-2.5 text-sm text-white"
								>
									Cancelar
								</Button>
							</div>
						</form>
					</Form>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
