'use client';

import { createContext, useState } from 'react';

type CartSteps = 'init-step' | 'supermarket-step' | 'create-cart-step';

interface ICartContext {
	step: CartSteps;
	setStep: (step: CartSteps) => void;

	nextStep: () => void;
	backStep: () => void;
}

export const CartContext = createContext<ICartContext>({
	step: 'init-step',
	setStep: () => {},

	nextStep: () => {},
	backStep: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
	const [step, setStep] = useState<CartSteps>('init-step');

	function nextStep() {
		switch (step) {
			case 'init-step':
				setStep('supermarket-step');
				break;
			case 'supermarket-step':
				setStep('create-cart-step');
				break;
			default:
				break;
		}
	}

	function backStep() {
		switch (step) {
			case 'create-cart-step':
				setStep('supermarket-step');
				break;

			case 'supermarket-step':
				setStep('init-step');
				break;
			default:
				break;
		}
	}

	return (
		<CartContext.Provider value={{ step, setStep, nextStep, backStep }}>
			{children}
		</CartContext.Provider>
	);
};
