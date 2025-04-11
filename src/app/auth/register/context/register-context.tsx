'use client';

import { createContext, useState } from 'react';

export type RegisterSteps =
	| 'name-email-step'
	| 'password-confirm-password-step'
	| 'submit-step';

export interface IRegisterContext {
	step: RegisterSteps;
	setStep: (step: RegisterSteps) => void;

	nextStep: () => void;
	backStep: () => void;
}

export const RegisterContext = createContext<IRegisterContext>({
	step: 'name-email-step',

	setStep: () => {},
	nextStep: () => {},
	backStep: () => {},
});

export function RegisterProvider({
	children,
}: {
	children: Readonly<React.ReactNode>;
}) {
	const [step, setStep] = useState<RegisterSteps>('name-email-step');

	function backStep() {
		switch (step) {
			case 'password-confirm-password-step':
				setStep('name-email-step');
				break;
			case 'submit-step':
				setStep('password-confirm-password-step');
				break;
			default:
				break;
		}
	}
	function nextStep() {
		switch (step) {
			case 'name-email-step':
				setStep('password-confirm-password-step');
				break;
			case 'password-confirm-password-step':
				setStep('submit-step');
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
