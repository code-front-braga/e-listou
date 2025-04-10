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
import { BeatLoader } from 'react-spinners';
import { AddItemForm } from './add-item-form';

export function ItemsList() {
	const { items, completeCartContext, setStep } = useContext(CartContext);
	const [isCancelDialogOpen, setIsCancelDialogOpen] = useState<boolean>(false);
	const [cancelCartLoading, setCancelCartLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [completeCartLoading, setCompleteCartLoading] =
		useState<boolean>(false);
	const [isCompleteDialogOpen, setIsCompleteDialogOpen] =
		useState<boolean>(false);

	function handleSuccess() {
		completeCartContext();
		setStep('init-step');
	}

	async function handleSubmitCart() {
		setCompleteCartLoading(true);
		setErrorMessage(null);

		const resPromise = completeCart();
		showPromiseToast({
			loading: 'Finalizando sua compra...',
			promise: resPromise,
		});

		try {
			const res = await resPromise;
			if (res.success) {
				handleSuccess();
			} else if (res.error) {
				setErrorMessage(res.error);
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
			if (res.success) handleSuccess();
		} catch (error) {
			console.error(error);
		} finally {
			setCancelCartLoading(false);
		}
	}

	const handleOpenCompleteDialog = () => setIsCompleteDialogOpen(true);

	const handleOpenCancelDialog = () => setIsCancelDialogOpen(true);

	return (
		<>
			{items && items.length > 0 ? (
				<div className="flex h-full w-full flex-col justify-between overflow-hidden">
					<ul className="flex h-full w-full flex-col gap-3 overflow-y-auto">
						{items?.map(item => <Items key={item.id} item={item} />)}
					</ul>

					{errorMessage && <p className="text-cabaret">{errorMessage}</p>}
					<button
						type="button"
						onClick={handleOpenCompleteDialog}
						className="bg-cadetBlue mt-2 flex items-center justify-between rounded px-4 py-2 text-white"
					>
						{completeCartLoading ? (
							<>
								Finalizando...
								<BeatLoader size={10} color="#fff" />
							</>
						) : (
							<>
								Finalizar Compra
								<TbShoppingCartCopy size={24} />
							</>
						)}
					</button>
					<button
						type="button"
						onClick={handleOpenCancelDialog}
						className="bg-cabaret mt-2 flex items-center justify-between rounded px-4 py-2 text-white"
						disabled={cancelCartLoading}
					>
						{cancelCartLoading ? (
							<>
								Cancelando...
								<BeatLoader size={10} color="#fff" />
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
					<p className="text-christalle mt-4 text-sm font-semibold">
						Sua lista está vazia. Adicione o seu primeiro item!
					</p>
					<div className="flex flex-col gap-3">
						<p className="text-christalle text-sm font-semibold">
							Desistiu de Comprar? É só cancelar!
						</p>
						<button
							type="button"
							onClick={handleCancelCart}
							disabled={cancelCartLoading}
							className="text-cabaret flex items-center gap-2 text-sm font-semibold"
						>
							{cancelCartLoading ? (
								<>
									<ImSpinner size={22} className="animate-spin" />
									Cancelando...
								</>
							) : (
								<>
									<TbShoppingCartCancel size={22} />
									Cancelar Compra
								</>
							)}
						</button>
					</div>
				</div>
			)}

			<AddItemForm />

			{isCompleteDialogOpen && (
				<ConfirmDialog
					title="Atenção"
					description="Não ficou faltando algo? Quer mesmo finalizar a compra?"
					handleFunction={handleSubmitCart}
					isCancelDialogOpen={isCompleteDialogOpen}
					setIsCancelDialogOpen={setIsCompleteDialogOpen}
				/>
			)}

			{isCancelDialogOpen && (
				<ConfirmDialog
					title="Atenção"
					description="Você já adicionou item(s). Tem certeza que deseja deletar o carrinho?"
					handleFunction={handleCancelCart}
					isCancelDialogOpen={isCancelDialogOpen}
					setIsCancelDialogOpen={setIsCancelDialogOpen}
				/>
			)}
		</>
	);
}
