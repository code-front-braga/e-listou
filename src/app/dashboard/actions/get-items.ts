'use server';

import { db } from '@/lib/db/prisma';
import { Prisma } from '@prisma/client';

interface GetItemsProps
	extends Prisma.ItemGetPayload<{ select: { cartId: true } }> {}

export async function getItems(cart: GetItemsProps) {
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
