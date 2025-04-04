'use client';

import { useContext, useState } from 'react';
import { CartContext } from '../contexts/cart';
import { Items } from './item';
import { ConfirmDialog } from '@/components/confirm-dialog';
import { completeCart } from '../../actions/complete-cart';
import { showPromiseToast } from '@/components/promise-toast';
import { ImSpinner } from 'react-icons/im';
import { TbShoppingCartCancel, TbShoppingCartCopy } from 'react-icons/tb';
import { deleteCart } from '../../actions/delete-cart';

export function ItemsList() {
	const { items, completeCartContext, setStep } = useContext(CartContext);
	const [isCancelDialogOpen, setIsCancelDialogOpen] = useState<boolean>(false);
	const [cancelCartLoading, setCancelCartLoading] = useState<boolean>(false);
	const [completeCartLoading, setCompleteCartLoading] =
		useState<boolean>(false);

	function handleSuccess() {
		completeCartContext();
		setStep('init-step');
	}

	async function handleSubmitCart() {
		setCompleteCartLoading(true);
		const resPromise = completeCart();
		showPromiseToast({
			loading: 'Finalizando sua compra...',
			promise: resPromise,
		});

		try {
			const res = await resPromise;
			if (res.success) {
				handleSuccess();
			}
			if (res.error) {
				console.error(res.error);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setCompleteCartLoading(false);
		}
	}

	async function handleCancelCart() {
		setCancelCartLoading(true);

		const resPromise = deleteCart();
		showPromiseToast({
			loading: 'Cancelando...',
			promise: resPromise,
		});

		try {
			const res = await resPromise;
			if (res.success) {
				handleSuccess();
			}
			if (res.error) {
				console.error(res.error);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setCancelCartLoading(false);
		}
	}

	function handleOpenDialogConfirm() {
		setIsCancelDialogOpen(true);
	}

	return (
		<>
			{items && items.length > 0 ? (
				<div className="flex h-full w-full flex-col justify-between overflow-hidden">
					<ul className="flex h-full w-full flex-col gap-3 overflow-y-auto">
						{items?.map(item => <Items key={item.id} item={item} />)}
					</ul>

					<button
						type="button"
						onClick={handleSubmitCart}
						className="bg-cadetBlue flex items-center justify-between rounded px-4 py-2 text-white shadow-[0_-4px_12px_#00000045]"
					>
						{completeCartLoading ? (
							<>
								Finalizando...
								<ImSpinner size={24} className="animate-spin" />
							</>
						) : (
							<>
								Finalizar
								<TbShoppingCartCopy size={24} />
							</>
						)}
					</button>
					<button
						type="button"
						onClick={handleOpenDialogConfirm}
						className="bg-cabaret mt-2 flex items-center justify-between rounded px-4 py-2 text-white"
						disabled={cancelCartLoading}
					>
						{cancelCartLoading ? (
							<>
								Cancelando...
								<ImSpinner size={24} className="animate-spin" />
							</>
						) : (
							<>
								Cancelar Compra
								<TbShoppingCartCancel size={24} />
							</>
						)}
					</button>
				</div>
			) : (
				<div className="flex h-full flex-col justify-between">
					<p className="text-christalle mt-4 font-semibold">
						Sua lista está vazia. Adicione o seu primeiro item!
					</p>
					<div className="flex flex-col gap-3">
						<p className="text-christalle font-semibold">
							Desistiu de Comprar? É só cancelar!
						</p>
						<button
							type="button"
							onClick={handleCancelCart}
							disabled={cancelCartLoading}
							className="text-cabaret flex items-center gap-2 font-semibold"
						>
							{cancelCartLoading ? (
								<>
									<ImSpinner size={24} className="animate-spin" />
									Cancelando...
								</>
							) : (
								<>
									<TbShoppingCartCancel size={24} />
									Cancelar Compra
								</>
							)}
						</button>
					</div>
				</div>
			)}

			{isCancelDialogOpen && (
				<ConfirmDialog
					title="Atenção"
					description="Tem certeza que deseja deletar o carrinho?"
					handleFunction={handleCancelCart}
					isCancelDialogOpen={isCancelDialogOpen}
					setIsCancelDialogOpen={setIsCancelDialogOpen}
				/>
			)}
		</>
	);
}
