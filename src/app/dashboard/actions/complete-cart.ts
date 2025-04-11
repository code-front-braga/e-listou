'use server';

import { db } from '@/lib/db/prisma';
import { CartStatus } from '@prisma/client';
import { calculateTotal } from '@/utils/calculate-total';
import { auth } from '../../../../auth';

export async function completeCart() {
	const session = await auth();
	const userId = session?.user?.id;
	if (!userId) return { error: 'Usuário não autenticado.' };

	try {
		const existingCart = await db.cart.findFirst({
			where: { userId, status: CartStatus.PENDING },
			include: { items: true },
		});

		if (existingCart) {
			const updatedCart = await db.cart.findUnique({
				where: { id: existingCart.id },
				include: { items: true },
			});
			if (!updatedCart?.items)
				return { error: 'Erro ao buscar os itens atualizados no carrinho.' };

			const total = calculateTotal(updatedCart.items);

			await db.cart.update({
				where: { id: existingCart.id },
				data: { status: CartStatus.COMPLETED, completedAt: new Date(), total },
			});

			return {
				success:
					'Compra finalizada com sucesso! Dê uma olhadinha no seu histórico.',
			};
		}
		return { error: 'Carrinho não encontrado.' };
	} catch (error) {
		return {
			error: `Ocorreu um erro inesperado. Não foi possível finalizar sua compra: ${error}`,
		};
	}
}
