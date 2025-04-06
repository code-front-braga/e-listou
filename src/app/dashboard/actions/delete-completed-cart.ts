'use server';

import { CartStatus, Prisma } from '@prisma/client';
import { auth } from '../../../../auth';
import { db } from '@/lib/db/prisma';

export async function deleteCompletedCart(
	cart: Prisma.CartGetPayload<{ select: { id: true } }>,
) {
	const session = await auth();
	const userId = session?.user?.id;

	console.log('userId antes da verificação:', userId);

	if (!userId) return { error: 'Usuário não autenticado.' };

	try {
		const existingCart = await db.cart.findFirst({
			where: { id: cart.id, userId, status: CartStatus.COMPLETED },
		});
		console.log('existingCart:', existingCart);

		if (existingCart) {
			await db.cart.delete({
				where: { id: existingCart.id, userId, status: CartStatus.COMPLETED },
			});

			return { success: 'Registro de compra deletado com sucesso!' };
		}

		return { error: 'Erro ao deletar registro de compra.' };
	} catch (error) {
		return {
			error: `Ocorreu um erro ao deletar o registro de compra: ${error}`,
		};
	}
}
