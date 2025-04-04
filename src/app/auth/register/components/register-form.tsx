'use client';

import { Form } from '@/components/ui/form';
import { RegisterData, registerSchema } from '@/lib/zod/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RegisterContext, RegisterSteps } from '../context/register-context';
import { InputStepModel } from './input-step-model';
import { AnimatePresence } from 'motion/react';
import { SubmitStep } from './submit-step';
import { createUser } from '../../actions/create-user';
import { showPromiseToast } from '@/components/promise-toast';
import { useRouter } from 'next/navigation';

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
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		if (fieldMap[step]) {
			form.setFocus(fieldMap[step]);
		}
	}, [form, step]);

	const handleNextStep = useCallback(
		async (fieldName: keyof RegisterData, nextStep: RegisterSteps) => {
			const isValid = await form.trigger(fieldName);
			if (isValid) {
				setStep(nextStep);
			}
		},
		[form, setStep],
	);

	const handlePasswordConfirmation = useCallback(
		(e: React.FormEvent) => {
			e.preventDefault();
			const isValid = form.trigger(['password', 'confirmPassword']);
			const { password, confirmPassword } = form.getValues();

			if (!isValid) return;

			if (password !== confirmPassword) {
				form.setError('confirmPassword', {
					message: 'As senhas não coincidem',
				});
				return;
			}

			nextStep();
		},
		[form, nextStep],
	);

	async function handleRegisterUser(data: RegisterData) {
		setSubmitLoading(true);
		setErrorMessage(null);

		try {
			const resPromise = createUser({ ...data });
			showPromiseToast({
				loading: 'Cadastrando usuário...',
				promise: resPromise,
			});
			const res = await resPromise;
			if (res.success) {
				router.push('/auth/login');
			} else if (res.error) {
				setErrorMessage(res.error);
				setStep('email-step');
			}
		} catch (error) {
			console.error('Erro ao cadastrar o usuário:', error);
		} finally {
			setSubmitLoading(false);
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleRegisterUser)}
				className="relative mx-auto mt-2.5 flex w-full flex-col items-center gap-3.5 overflow-hidden"
			>
				{errorMessage && (
					<p className="text-cabaret">{errorMessage}</p>
				)}
				<AnimatePresence mode="wait">
					{step === 'name-step' && (
						<InputStepModel
							form={form}
							type="text"
							fieldName="name"
							label="Nome"
							ariaLabel="Nome de usuário"
							placeholder="Digite seu nome/apelido..."
							autoComplete="name"
							title="Para começar, digite seu nome ou um apelido..."
							onNext={() => handleNextStep('name', 'email-step')}
						/>
					)}

					{step === 'email-step' && (
						<InputStepModel
							form={form}
							type="email"
							fieldName="email"
							label="Email"
							placeholder="Digite seu email..."
							autoComplete="email"
							title="Agora, digite seu melhor email..."
							onNext={() => handleNextStep('email', 'password-step')}
						/>
					)}

					{step === 'password-step' && (
						<InputStepModel
							form={form}
							type="password"
							fieldName="password"
							label="Senha"
							placeholder="Digite sua senha..."
							autoComplete="new-password"
							title="Crie uma senha..."
							showPassword={showPassword}
							setShowPassword={() => setShowPassword(!showPassword)}
							onNext={() => handleNextStep('password', 'confirm-password-step')}
						/>
					)}

					{step === 'confirm-password-step' && (
						<InputStepModel
							form={form}
							type="password"
							fieldName="confirmPassword"
							label="Confirme a senha"
							title="Por favor, confirme sua senha..."
							placeholder="Confirme sua senha..."
							autoComplete="new-password"
							showPassword={showConfirmPassword}
							setShowPassword={() =>
								setShowConfirmPassword(!showConfirmPassword)
							}
							onNext={e => handlePasswordConfirmation(e)}
						/>
					)}

					{step === 'submit-step' && <SubmitStep loading={submitLoading} />}
				</AnimatePresence>
			</form>
		</Form>
	);
}
