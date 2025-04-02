'use server';

import { db } from '@/lib/db/prisma';

export async function updateLogin(email: string) {
	try {
		const existingUser = await db.user.update({
			where: { email },
			data: { isFirstLogin: false },
		});

		if (!existingUser) {
			return {
				error: 'Erro ao redirecionar para o dashboard. Tente novamente.',
			};
		}

		return { success: 'Seja bem vindo (a)!', existingUser };
	} catch (error) {
		console.error('Erro ao atualizar login:', error);
		return {
			error: 'Ops! Ocorreu um erro ao ser redirecionado para o dashboard.',
		};
	}
}
