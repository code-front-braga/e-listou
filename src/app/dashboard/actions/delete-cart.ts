'use server';

import { db } from '@/lib/db/prisma';
import { auth } from '../../../../auth';
import { CartStatus } from '@prisma/client';

export async function deleteCart() {
	const session = await auth();
	if (!session?.user?.id) return { error: 'Usuário não autenticado.' };

	try {
		const existingCart = await db.cart.findFirst({
			where: { userId: session.user.id, status: CartStatus.PENDING },
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
