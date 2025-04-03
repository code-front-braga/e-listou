'use client';

import { useContext } from 'react';
import { CartContext } from '../contexts/cart';
import { InitStep } from './init-step';
import { SupermarketStep } from './supermarket-step';

export function AllSteps() {
	const { step } = useContext(CartContext);

	return (
		<>
			{step === 'init-step' && <InitStep />}
			{step === 'supermarket-step' && <SupermarketStep />}
		</>
	);
}
