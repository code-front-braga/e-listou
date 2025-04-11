'use server';

import { db } from '@/lib/db/prisma';
import { CartStatus } from '@prisma/client';
import { auth } from '../../../../auth';

export async function deleteCart() {
	const session = await auth();
	const userId = session?.user?.id;
	if (!userId) return { error: 'Usuário não autenticado.' };

	try {
		const existingCart = await db.cart.findFirst({
			where: { userId, status: CartStatus.PENDING },
		});

		if (existingCart) {
			await db.cart.delete({ where: { id: existingCart.id } });

			return { success: 'Compra cancelada com sucesso!' };
		}

		return { error: 'Carrinho não encontrado. Atualize a página.' };
	} catch (error) {
		console.error(error);
		return { error: 'Erro ao cancelar a compra.' };
	}
}
