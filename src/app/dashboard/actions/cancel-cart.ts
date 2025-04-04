'use server';

import { db } from '@/lib/db/prisma';
import { auth } from '../../../../auth';
import { CartStatus } from '@prisma/client';

export async function cancelCart() {
	const session = await auth();
	const userId = session?.user?.id;
	if (!userId) return { error: 'Usuário não autenticado.' };

	try {
		const existingCart = await db.cart.findFirst({
			where: { userId, status: CartStatus.PENDING },
		});
		if (existingCart) {
			await db.cart.delete({ where: { id: existingCart.id } });

			return { success: 'Carrinho cancelado com sucesso!' };
		}

		return { error: 'Não foi possível cancelar o carrinho.' };
	} catch (error) {
		return { error: 'Ocorreu um erro ao cancelar o carrinho.' };
	}
}
