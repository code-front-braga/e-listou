'use client';

import { firstLetterToUpperCase } from '@/utils/first-letter-to-upper-case';
import { formatToCurrencyBRL } from '@/utils/format-to-currency-brl';
import { Item } from '@prisma/client';
import { useContext, useState } from 'react';
import { BiSolidEditAlt } from 'react-icons/bi';
import { ImSpinner } from 'react-icons/im';
import { MdDelete } from 'react-icons/md';
import { CartContext } from '../contexts/cart';
import { EditItemForm } from './edit-item-form';
import { EditItemData, editItemSchema } from '@/lib/zod/cart';
import { editItem } from '../../actions/edit-item';
import { showPromiseToast } from '@/components/promise-toast';
import { multiplyNumbers } from '@/utils/mutiply-numbers';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { deleteItem } from '../../actions/delete-item';
import { ConfirmDialog } from '@/components/confirm-dialog';
import { AnimatePresence, motion } from 'motion/react';

interface ItemsProps {
	item: Item;
}

export function Items({ item }: ItemsProps) {
	const form = useForm<EditItemData>({
		resolver: zodResolver(editItemSchema),
		defaultValues: {
			price: 0,
			quantity: 0,
		},
	});
	const { closeDeleteItemForm, editItemContext, deleteItemContext } =
		useContext(CartContext);
	const [editItemLoading, setEditItemLoading] = useState<boolean>(false);
	const [editItemFormOpen, setEditItemFormOpen] = useState<boolean>(false);
	const [deleteItemLoading, setDeleteItemLoading] = useState<boolean>(false);
	const [isCancelDialogOpen, setCancelDialogOpen] = useState<boolean>(false);

	async function handleEditItem(data: EditItemData) {
		setEditItemLoading(true);

		const resPromise = editItem({ id: item.id, ...data });
		showPromiseToast({
			loading: 'Editando...',
			promise: resPromise,
		});

		try {
			const res = await resPromise;
			if (res.success) {
				editItemContext({
					...item,
					...data,
					totalPrice: multiplyNumbers(data.price, data.quantity),
				});
				setEditItemFormOpen(false);

				form.reset();
			}
		} catch (error) {
			console.error(error);
		} finally {
			setEditItemLoading(false);
		}
	}

	async function handleDeleteItem() {
		setDeleteItemLoading(true);

		const resPromise = deleteItem({ ...item });
		showPromiseToast({
			loading: 'Deletando...',
			promise: resPromise,
		});

		try {
			const res = await resPromise;
			if (res.success) {
				deleteItemContext({ ...item });
				closeDeleteItemForm();
			}
		} catch (error) {
			console.error(error);
		} finally {
			setDeleteItemLoading(false);
			setCancelDialogOpen(false);
		}
	}

	return (
		<>
			<li className="bg-moonRaker/80 text-christalle flex items-center justify-between gap-5 rounded p-1.5 text-sm font-semibold">
				<div className="flex flex-1 items-center justify-between">
					<div className="flex flex-col">
						<span>
							Produto: <span>{firstLetterToUpperCase(item.name)}</span>
						</span>
						<span>
							Preço (Un.): <span>{formatToCurrencyBRL(item.price)}</span>
						</span>
						<span>
							Quantidade: <span>{item.quantity}</span>
						</span>
					</div>
					<div className="flex flex-col items-end">
						<span>Total</span>
						<span>{formatToCurrencyBRL(item.totalPrice)}</span>
					</div>
				</div>
				<div className="flex h-full flex-col items-center justify-around border-l-1 border-l-white pl-2">
					<button type="button" onClick={() => setEditItemFormOpen(true)}>
						<BiSolidEditAlt size={22} className="text-christalle" />
					</button>
					<button
						type="button"
						onClick={() => setCancelDialogOpen(true)}
						disabled={deleteItemLoading}
						aria-label="Deletar Item"
					>
						{deleteItemLoading ? (
							<ImSpinner size={22} className="text-cabaret animate-spin" />
						) : (
							<MdDelete size={22} className="text-cabaret" />
						)}
					</button>
				</div>
			</li>

			<AnimatePresence>
				{editItemFormOpen && (
					<motion.div
						initial={{ y: -100, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: -100, opacity: 0 }}
						transition={{ type: 'tween', ease: 'anticipate' }}
						className="bg-christalle absolute top-1/2 left-1/2 w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-lg p-2 shadow-xl"
					>
						<EditItemForm
							item={item}
							form={form}
							onSubmit={handleEditItem}
							editItemLoading={editItemLoading}
							setEditItemFormOpen={setEditItemFormOpen}
						/>
					</motion.div>
				)}
			</AnimatePresence>

			{isCancelDialogOpen && (
				<ConfirmDialog
					title="Atenção!"
					description="Tem certeza que deseja deletar o item?"
					isCancelDialogOpen={isCancelDialogOpen}
					setIsCancelDialogOpen={setCancelDialogOpen}
					handleFunction={handleDeleteItem}
				/>
			)}
		</>
	);
}
