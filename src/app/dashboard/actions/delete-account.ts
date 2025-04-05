'use server';

import { db } from '@/lib/db/prisma';
import { Prisma } from '@prisma/client';

export async function deleteUserAccount(
	user: Prisma.UserGetPayload<{ select: { email: true } }>,
) {
	if (!user.email) {
		return { error: 'Usuário não autenticado.' };
	}

	try {
		await db.user.delete({
			where: { email: user.email },
		});

		return { success: 'Conta excluída com sucesso.' };
	} catch (error) {
		console.error('Erro ao excluir conta:', error);
		return { error: 'Erro ao excluir conta. Tente novamente.' };
	}
}
