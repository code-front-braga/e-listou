'use server';

import { db } from '@/lib/db/prisma';
import { CredentialsLoginData, credentialsLoginSchema } from '@/lib/zod/auth';
import { compare } from 'bcrypt-ts';
import { signIn } from '../../../../auth';
import { AuthError } from 'next-auth';

export async function login(data: CredentialsLoginData) {
	try {
		const validatedData = credentialsLoginSchema.parse(data);
		if (!validatedData) return { error: 'Dados de entrada inválidos.' };

		const { email, password } = validatedData;

		const existingUser = await db.user.findUnique({
			where: { email },
		});

		if (!existingUser || !existingUser.email || !existingUser.password)
			return { error: 'Usuário não encontrado.' };

		const passwordsMatch = await compare(password, existingUser.password);
		if (!passwordsMatch) return { error: 'Credenciais inválidas.' };

		await signIn('credentials', {
			email: existingUser.email,
			password,
			redirect: false,
		});

		return { success: 'Usuário logado com sucesso!' };
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return { error: 'Credenciais inválidas.' };

				default:
					return { error: 'Por favor, confirme seu endereço de email.' };
			}
		}
		throw error;
	}
}
