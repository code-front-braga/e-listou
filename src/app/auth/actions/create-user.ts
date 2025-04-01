'use server';

import { db } from '@/lib/db/prisma';
import { RegisterData, registerSchema } from '@/lib/zod/auth';
import { formatToLowerCase } from '@/utils/format-to-lower-case';
import { hash } from 'bcrypt-ts';

export async function createUser(data: RegisterData) {
	try {
		const validatedData = registerSchema.parse(data);
		if (!validatedData) return { error: 'Dados de cadastro inválidos.' };

		const { name, email, password, confirmPassword } = validatedData;

		if (password !== confirmPassword)
			return { error: 'As senhas não conferem.' };

		const hashedPassword = await hash(password, 12);

		const existingUser = await db.user.findUnique({ where: { email } });

		if (existingUser)
			return {
				error:
					'Já existe um usuário com este e-mail. Cadastre-se com outro e-mail.',
			};

		const newUser = await db.user.create({
			data: {
				name,
				email: formatToLowerCase(email),
				password: hashedPassword,
				isFirstLogin: true,
			},
		});

		return { success: 'Usuário cadastrado com sucesso!', newUser };
	} catch (error) {
		return { error: 'Ocorreu um erro ao cadastrar o usuário' };
	}
}
