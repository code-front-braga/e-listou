'use server';

import { db } from '@/lib/db/prisma';
import { CartStatus } from '@prisma/client';
import { auth } from '../../../../auth';

export async function getPendingCart() {
	const session = await auth();
	const userId = session?.user?.id;

	if (!userId) return null;

	try {
		const existingCart = await db.cart.findFirst({
			where: { userId, status: CartStatus.PENDING },
			select: { id: true, supermarket: true },
		});

		if (existingCart) {
			return { id: existingCart.id, supermarket: existingCart.supermarket };
		}

		return null;
	} catch (error) {
		console.error('Erro ao buscar o carrinho:', error);
		return null;
	}
}
