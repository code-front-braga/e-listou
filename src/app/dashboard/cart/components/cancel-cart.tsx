'use client';

import { useContext, useState } from 'react';
import { ImSpinner } from 'react-icons/im';
import { TbShoppingCartCancel } from 'react-icons/tb';
import { cancelCart } from '../../actions/cancel-cart';
import { showPromiseToast } from '@/components/promise-toast';
import { CartContext } from '../contexts/cart';

export function CancelCart() {
	const [cancelLoading, setCancelLoading] = useState<boolean>(false);
	const { setStep } = useContext(CartContext);

	async function handleCancelCart(e: React.FormEvent) {
		e.preventDefault();
		setCancelLoading(true);

		const resPromise = cancelCart();
		showPromiseToast({
			loading: 'Cancelando...',
			promise: resPromise,
		});

		try {
			const res = await resPromise;
			if (res.success) {
				setStep('init-step');
			}
		} catch (error) {
			console.error('Erro ao tentar cancelar o carrinho:', error);
		} finally {
			setCancelLoading(false);
		}
	}

	return (
		<form onSubmit={handleCancelCart}>
			<button
				type="submit"
				disabled={cancelLoading}
				aria-label="Cancelar Compra"
				className="text-cabaret flex items-center gap-2 font-semibold"
			>
				{cancelLoading ? (
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
		</form>
	);
}
