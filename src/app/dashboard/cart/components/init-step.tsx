'use client';

import { useContext } from 'react';
import { CartContext } from '../contexts/cart';
import { StepTransition } from './step-transition';
import { FaPlus } from 'react-icons/fa';

export function InitStep() {
	const { nextStep } = useContext(CartContext);

	return (
		<StepTransition className="flex h-full">
			<button onClick={nextStep} className="flex items-center gap-2 self-end">
				<FaPlus size={20} color="#f25c05" />
				<span className="text-christalle font-semibold">
					Nova Lista de Compras
				</span>
			</button>
		</StepTransition>
	);
}
