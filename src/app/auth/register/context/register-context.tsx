'use client';

import { createContext, useState } from 'react';

export type RegisterSteps =
	| 'name-step'
	| 'email-step'
	| 'password-step'
	| 'confirm-password-step'
	| 'submit-step';

export interface IRegisterContext {
	step: RegisterSteps;
	setStep: (step: RegisterSteps) => void;

	nextStep: () => void;
	backStep: () => void;
}

export const RegisterContext = createContext<IRegisterContext>({
	step: 'name-step',

	setStep: () => {},
	nextStep: () => {},
	backStep: () => {},
});

export function RegisterProvider({
	children,
}: {
	children: Readonly<React.ReactNode>;
}) {
	const [step, setStep] = useState<RegisterSteps>('name-step');

	function backStep() {
		switch (step) {
			case 'email-step':
				setStep('name-step');
				break;
			case 'password-step':
				setStep('email-step');
				break;
			case 'confirm-password-step':
				setStep('password-step');
				break;
			case 'submit-step':
				setStep('confirm-password-step');
				break;
			default:
				break;
		}
	}
	function nextStep() {
		switch (step) {
			case 'name-step':
				setStep('email-step');
				break;
			case 'email-step':
				setStep('password-step');
				break;
			case 'password-step':
				setStep('confirm-password-step');
				break;
			case 'confirm-password-step':
				setStep('submit-step');
				break;
			case 'submit-step':
				setStep('confirm-password-step');
				break;
			default:
				return step;
		}
	}

	return (
		<RegisterContext.Provider value={{ step, setStep, nextStep, backStep }}>
			{children}
		</RegisterContext.Provider>
	);
}
