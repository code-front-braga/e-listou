'use server';

import { db } from '@/lib/db/prisma';
import { Prisma } from '@prisma/client';

export async function getItems(
	cart: Prisma.ItemGetPayload<{ select: { cartId: true } }>,
) {
	try {
		const cartItems = await db.item.findMany({
			where: { cartId: cart.cartId },
		});

		return cartItems;
	} catch (error) {
		console.error('Erro ao buscar os itens do carrinho:', error);
		return [];
	}
}
