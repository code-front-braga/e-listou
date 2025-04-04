'use client';

import { useContext } from 'react';
import { CartContext } from '../contexts/cart';
import { InitStep } from './init-step';
import { SupermarketNameStep } from './supermarket-name-step';
import { AddItemsStep } from './add-items-step';

export function AllSteps() {
	const { step } = useContext(CartContext);

	return (
		<>
			{step === 'init-step' && <InitStep />}
			{step === 'supermarket-step' && <SupermarketNameStep />}
			{step === 'add-items-step' && <AddItemsStep />}
		</>
	);
}
