'use client';

import { useContext } from 'react';
import { CartContext } from '../contexts/cart';
import { StepTransition } from './step-transition';
import { FaPlus } from 'react-icons/fa';
import { PendingCartMessage } from './pending-cart-message';
import { TailSpin } from 'react-loader-spinner';

export function InitStep() {
	const { nextStep, setStep, pendingCart, pendingLoading, setSupermarketName } =
		useContext(CartContext);

	if (pendingLoading) {
		return (
			<div className="flex h-full flex-col items-center justify-center gap-4">
				<TailSpin visible height="40" width="40" color="#d94e67" />
				<p>Verificando se possui carrinho pendente...</p>
			</div>
		);
	}

	const handleContinueWithPendingCart = () => {
		if (pendingCart) {
			setSupermarketName(pendingCart.supermarketName);

			setStep('add-items-step');
		}
	};

	return (
		<div className="flex h-full">
			{pendingCart ? (
				<PendingCartMessage onClick={handleContinueWithPendingCart} />
			) : (
				<StepTransition className="flex h-full">
					<button
						onClick={nextStep}
						className="flex items-center gap-2 self-end"
					>
						<FaPlus size={20} color="#f25c05" />
						<span className="text-christalle font-semibold">
							Nova Lista de Compras
						</span>
					</button>
				</StepTransition>
			)}
		</div>
	);
}
