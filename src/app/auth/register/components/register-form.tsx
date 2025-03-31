'use client';

import { Form } from '@/components/ui/form';
import { RegisterData, registerSchema } from '@/lib/zod/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RegisterContext, RegisterSteps } from '../context/register-context';
import { InputStepModel } from './input-step-model';
import { AnimatePresence } from 'motion/react';
import { SubmitStep } from './submit-step';

const fieldMap: Partial<Record<RegisterSteps, keyof RegisterData>> = {
	'name-step': 'name',
	'email-step': 'email',
	'password-step': 'password',
	'confirm-password-step': 'confirmPassword',
};

export function RegisterForm() {
	const form = useForm<RegisterData>({
		resolver: zodResolver(registerSchema),
		defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
	});
	const { step, setStep, nextStep } = useContext(RegisterContext);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showConfirmPassword, setShowConfirmPassword] =
		useState<boolean>(false);
	const [submitLoading, setSubmitLoading] = useState<boolean>(false);

	useEffect(() => {
		if (fieldMap[step]) {
			form.setFocus(fieldMap[step]);
		}
	}, [step]);

	async function handleNextStep(
		fieldName: keyof RegisterData,
		nextStep: RegisterSteps,
	) {
		const isValid = await form.trigger(fieldName);
		if (isValid) {
			setStep(nextStep);
		}
	}

	function handlePasswordConfirmation(e: React.FormEvent) {
		e.preventDefault();
		const isValid = form.trigger(['password', 'confirmPassword']);
		const { password, confirmPassword } = form.getValues();

		if (!isValid) return;

		if (password !== confirmPassword) {
			form.setError('confirmPassword', { message: 'As senhas não coincidem' });
			return;
		}

		nextStep();
	}

	return (
		<Form {...form}>
			<form
				onSubmit={() => {}}
				className="relative mx-auto mt-2.5 flex w-full flex-col items-center gap-3.5 overflow-hidden"
			>
				<AnimatePresence mode="wait">
					{step === 'name-step' && (
						<InputStepModel
							form={form}
							title="Para começar, digite seu nome ou um apelido..."
							label="Nome"
							fieldName="name"
							placeholder="Digite seu nome/apelido..."
							onNext={() => handleNextStep('name', 'email-step')}
						/>
					)}

					{step === 'email-step' && (
						<InputStepModel
							form={form}
							title="Agora, digite seu melhor email..."
							label="Email"
							fieldName="email"
							placeholder="Digite seu email..."
							onNext={() => handleNextStep('email', 'password-step')}
						/>
					)}

					{step === 'password-step' && (
						<InputStepModel
							form={form}
							title="Crie uma senha..."
							label="Senha"
							fieldName="password"
							placeholder="Digite sua senha..."
							onNext={() => handleNextStep('password', 'confirm-password-step')}
							type="password"
							autoComplete="new-password"
							showPassword={showPassword}
							setShowPassword={() => setShowPassword(!showPassword)}
						/>
					)}

					{step === 'confirm-password-step' && (
						<InputStepModel
							form={form}
							title="Por favor, confirme sua senha..."
							label="Confirme a senha"
							fieldName="confirmPassword"
							placeholder="Confirme sua senha..."
							onNext={e => handlePasswordConfirmation(e)}
							type="password"
							showPassword={showConfirmPassword}
							setShowPassword={() =>
								setShowConfirmPassword(!showConfirmPassword)
							}
						/>
					)}

					{step === 'submit-step' && <SubmitStep loading={submitLoading} />}
				</AnimatePresence>
			</form>
		</Form>
	);
}
