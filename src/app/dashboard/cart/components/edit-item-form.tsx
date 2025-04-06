'use client';

import { Item } from '@prisma/client';
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
import { UseFormReturn } from 'react-hook-form';
import { EditItemData } from '@/lib/zod/cart';
import { formatToCurrencyBRL } from '@/utils/format-to-currency-brl';

interface EditItemFormProps {
	item: Item;
	form: UseFormReturn<EditItemData>;
	onSubmit: (data: EditItemData) => void;
	editItemLoading: boolean;
	setEditItemFormOpen: (param: boolean) => void;
}

export function EditItemForm({
	item,
	form,
	onSubmit,
	editItemLoading,
	setEditItemFormOpen,
}: EditItemFormProps) {
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="text-cabaret mb-2 flex items-center gap-2 text-xs">
					<p className="flex-1">
						Preço Atual: {formatToCurrencyBRL(item.price)}
					</p>
					<p className="flex-1">Quantidade Atual: {item.quantity}</p>
				</div>
				<div className="relative flex w-full items-center gap-4">
					<FormField
						control={form.control}
						name="price"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel className="text-moonRaker">Novo Preço</FormLabel>
								<FormControl>
									<Input
										type="text"
										value={field.value ? formatToCurrencyBRL(field.value) : ''}
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
								<FormLabel className="text-moonRaker">Quantidade</FormLabel>
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
				<div className="mt-6 flex gap-2.5">
					<Button
						type="submit"
						disabled={editItemLoading}
						className="bg-cadetBlue font-gantari mt-1.5 w-full flex-1 cursor-pointer rounded py-2.5 text-sm text-white"
					>
						Editar Item
					</Button>
					<Button
						type="button"
						onClick={() => setEditItemFormOpen(false)}
						className="bg-cabaret font-gantari mt-1.5 w-full flex-1 cursor-pointer rounded py-2.5 text-sm text-white"
					>
						Cancelar
					</Button>
				</div>
			</form>
		</Form>
	);
}
