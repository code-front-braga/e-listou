'use server';

import { db } from '@/lib/db/prisma';
import { auth } from '../../../../auth';
import { CartStatus } from '@prisma/client';
import { calculateTotal } from '@/utils/calculate-total';

export async function completeCart() {
	const session = await auth();
	if (!session?.user?.id) return { error: 'Usuário não autenticado.' };

	try {
		const existingCart = await db.cart.findFirst({
			where: { userId: session.user.id, status: CartStatus.PENDING },
			include: { items: true },
		});

		if (existingCart) {
			const total = calculateTotal(existingCart.items);

			await db.cart.update({
				where: { id: existingCart.id },
				data: { status: CartStatus.COMPLETED, completedAt: new Date(), total },
			});

			return { success: 'Compra finalizada com sucesso!' };
		}
		return { error: 'Carrinho não encontrado.' };
	} catch (error) {
		return {
			error:
				'Ocorreu um erro inesperado. Não foi possível finalizar sua compra.',
		};
	}
}
