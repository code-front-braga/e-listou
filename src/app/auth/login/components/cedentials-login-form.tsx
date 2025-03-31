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
import { useForm } from 'react-hook-form';
import { FaSignInAlt } from 'react-icons/fa';
import { ImSpinner } from 'react-icons/im';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';

export function CredentialsLoginForm() {
	const form = useForm<CredentialsLoginData>({
		resolver: zodResolver(credentialsLoginSchema),
		defaultValues: { email: '', password: '' },
	});

	async function handleLogin() {}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleLogin)}
				className="mx-auto mt-2.5 flex w-full flex-col items-center gap-8"
			>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem className="relative w-full">
							<FormLabel className="text-cabaret">Email</FormLabel>
							<FormControl>
								<Input
									placeholder="Digite seu email..."
									{...field}
									autoComplete="email"
									className="bg-christalle/25 text-christalle rounded p-2 indent-2 text-sm placeholder:text-white"
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
							<FormLabel className="text-cabaret">Senha</FormLabel>
							<FormControl>
								<Input
									placeholder="Digite sua senha..."
									{...field}
									autoComplete="current-password"
									className="bg-christalle/25 text-christalle rounded p-2 indent-2 text-sm placeholder:text-white"
								/>
							</FormControl>
							{/* <button
								className="text-christalle absolute top-7.5 right-3.5"
								type="button"
							>
								{showPassword ? (
									<IoIosEye size={18} />
								) : (
									<IoIosEyeOff size={18} />
								)}
							</button> */}
							<FormMessage className="absolute -bottom-5" />
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					className="bg-cabaret flex w-full cursor-pointer items-center justify-between rounded px-4 py-2 text-sm text-white"
				>
					{/* {loading ? (
						<>
							<span>Entrando...</span>
							<ImSpinner size={24} className="animate-spin" />
						</>
					) : (
						<>
							<span>Entrar</span>
							<FaSignInAlt size={24} />
						</>
					)} */}
					Entrar
				</Button>
			</form>
		</Form>
	);
}
