'use client';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { RegisterData, registerSchema } from '@/lib/zod/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RegisterContext } from '../context/register-context';
import { AnimatePresence, motion } from 'motion/react';
import { SubmitStep } from './submit-step';
import { createUser } from '../../actions/create-user';
import { showPromiseToast } from '@/components/promise-toast';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import { BackButton } from './back-button';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';

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
		if (step === 'name-email-step') {
			form.setFocus('name');
		}
	}, [step]);

	async function handleConfirmNameAndEmail() {
		const isValid = await form.trigger(['name', 'email']);

		if (isValid) nextStep();
	}

	async function handleConfirmPasswords() {
		const isValid = await form.trigger(['password', 'confirmPassword']);

		if (isValid) nextStep();
	}

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
				setStep('name-email-step');
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
				{errorMessage && <p className="text-cabaret">{errorMessage}</p>}
				<AnimatePresence mode="wait">
					{step === 'name-email-step' && (
						<motion.div
							key="name-email-step"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.3 }}
							className="flex h-58 w-full flex-col justify-around gap-6"
						>
							<h3 className="text-christalle text-sm font-semibold">
								Para começar, digite seu nome e melhor email...
							</h3>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem className="relative w-full">
										<FormControl>
											<Input
												{...field}
												type="text"
												placeholder="Digite seu nome..."
												aria-label="Seu nome"
												className="bg-christalle/65 rounded p-2 indent-2 text-sm text-white placeholder:text-white"
											/>
										</FormControl>
										<FormMessage className="absolute -bottom-4 text-xs font-semibold" />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem className="relative w-full">
										<FormControl>
											<Input
												{...field}
												type="text"
												placeholder="Digite seu email..."
												aria-label="Seu email"
												className="bg-christalle/65 rounded p-2 indent-2 text-sm text-white placeholder:text-white"
											/>
										</FormControl>
										<FormMessage className="absolute -bottom-4 text-xs font-semibold" />
									</FormItem>
								)}
							/>

							<button
								type="button"
								onClick={handleConfirmNameAndEmail}
								className="bg-cabaret mt-3 flex w-full items-center justify-between rounded px-4 py-2 text-sm text-white"
							>
								<span>Avançar</span>
								<motion.div
									animate={{ x: 8 }}
									transition={{
										duration: 0.6,
										repeat: Infinity,
										repeatType: 'reverse',
									}}
								>
									<MdOutlineKeyboardDoubleArrowRight size={24} />
								</motion.div>
							</button>
						</motion.div>
					)}

					{step === 'password-confirm-password-step' && (
						<motion.div
							key="password-confirm-password-step"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.3 }}
							className="flex h-58 w-full flex-col justify-around gap-6"
						>
							<div className="flex items-center justify-between gap-2">
								<h3 className="text-christalle text-sm font-semibold">
									Agora, crie uma senha segura e confirme-a...
								</h3>
								<BackButton />
							</div>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem className="relative w-full">
										<FormControl>
											<Input
												{...field}
												type={showPassword ? 'text' : 'password'}
												placeholder="Crie uma senha..."
												aria-label="Sua senha"
												autoComplete="new-password"
												className="bg-christalle/65 rounded p-2 indent-2 text-sm text-white placeholder:text-white"
											/>
										</FormControl>
										<button
											type="button"
											onClick={() => setShowPassword(!showPassword)}
											className="absolute top-2.5 right-3.5 text-white"
										>
											{showPassword ? <IoIosEye /> : <IoIosEyeOff />}
										</button>
										<FormMessage className="absolute -bottom-4 text-xs font-semibold" />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem className="relative w-full">
										<FormControl>
											<Input
												type={showConfirmPassword ? 'text' : 'password'}
												placeholder="Confirme a senha..."
												aria-label="Confirme a senha"
												{...field}
												className="bg-christalle/65 rounded p-2 indent-2 text-sm text-white placeholder:text-white"
											/>
										</FormControl>
										<button
											type="button"
											onClick={() =>
												setShowConfirmPassword(!showConfirmPassword)
											}
											className="absolute top-2.5 right-3.5 text-white"
										>
											{showConfirmPassword ? <IoIosEye /> : <IoIosEyeOff />}
										</button>
										<FormMessage className="absolute -bottom-4 text-xs font-semibold" />
									</FormItem>
								)}
							/>
							<button
								type="button"
								onClick={handleConfirmPasswords}
								className="bg-cabaret mt-3 flex w-full items-center justify-between rounded px-4 py-2 text-sm text-white"
							>
								<span>Avançar</span>
								<motion.div
									animate={{ x: 8 }}
									transition={{
										duration: 0.6,
										repeat: Infinity,
										repeatType: 'reverse',
									}}
								>
									<MdOutlineKeyboardDoubleArrowRight size={24} />
								</motion.div>
							</button>
						</motion.div>
					)}

					{step === 'submit-step' && <SubmitStep loading={submitLoading} />}
				</AnimatePresence>
			</form>
		</Form>
	);
}
