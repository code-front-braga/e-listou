'use client';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CredentialsLoginData, credentialsLoginSchema } from '@/lib/zod/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaSignInAlt } from 'react-icons/fa';
import { ImSpinner } from 'react-icons/im';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import { login } from '../../actions/login';
import { showPromiseToast } from '@/components/promise-toast';
import { useRouter } from 'next/navigation';
import { getUserByEmail } from '@/app/auth/actions/get-user-by-email';

export function CredentialsLoginForm() {
	const form = useForm<CredentialsLoginData>({
		resolver: zodResolver(credentialsLoginSchema),
		defaultValues: { email: '', password: '' },
	});
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [loginLoading, setLoginLoading] = useState<boolean>(false);
	const router = useRouter();
	const focusSet = useRef(false);

	useEffect(() => {
		if (!focusSet.current) {
			form.setFocus('email');
			focusSet.current = true;
		}
	}, [form]);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	async function handleLogin(data: CredentialsLoginData) {
		setLoginLoading(true);

		const resPromise = login(data);
		showPromiseToast({
			loading: 'Logando...',
			promise: resPromise,
		});
		try {
			const res = await resPromise;
			if (res.success) {
				const user = await getUserByEmail(data.email);

				user?.isFirstLogin === true
					? router.push('/welcome')
					: router.push('/dashboard');
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoginLoading(false);
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleLogin)}
				className="flex w-full flex-col items-center gap-8"
			>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem className="relative w-full">
							<FormLabel className="text-christalle">Email</FormLabel>
							<FormControl>
								<Input
									placeholder="Digite seu email..."
									{...field}
									autoComplete="email"
									aria-label="Seu email"
									className="bg-christalle/65 rounded p-2 indent-2 text-sm text-white placeholder:text-white"
								/>
							</FormControl>
							<FormMessage className="absolute -bottom-5" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem className="relative w-full">
							<FormLabel className="text-christalle">Senha</FormLabel>
							<FormControl>
								<Input
									type={showPassword ? 'text' : 'password'}
									placeholder="Digite sua senha..."
									{...field}
									autoComplete="current-password"
									aria-label="Sua senha"
									className="bg-christalle/65 rounded p-2 indent-2 text-sm text-white placeholder:text-white"
								/>
							</FormControl>
							<button
								type="button"
								onClick={togglePasswordVisibility}
								className="text-christalle absolute top-7.5 right-3.5"
							>
								{showPassword ? (
									<IoIosEye size={18} />
								) : (
									<IoIosEyeOff size={18} />
								)}
							</button>
							<FormMessage className="absolute -bottom-5" />
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					disabled={loginLoading}
					className="bg-cabaret flex w-full cursor-pointer items-center justify-between rounded px-4 py-2 text-sm text-white"
				>
					{loginLoading ? (
						<>
							<span>Entrando...</span>
							<ImSpinner size={24} className="animate-spin" />
						</>
					) : (
						<>
							<span>Entrar</span>
							<FaSignInAlt size={24} />
						</>
					)}
				</Button>
			</form>
		</Form>
	);
}
