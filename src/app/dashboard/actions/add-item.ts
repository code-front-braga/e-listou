'use server';

import { AddNewItemData } from '@/lib/zod/cart';
import { db } from '@/lib/db/prisma';
import { CartStatus } from '@prisma/client';
import { multiplyNumbers } from '@/utils/mutiply-numbers';
import { auth } from '../../../../auth';

export async function addItem(data: AddNewItemData) {
	const session = await auth();
	const userId = session?.user?.id;
	if (!userId) return { error: 'Usuário não autenticado.' };

	try {
		const existingCart = await db.cart.findFirst({
			where: { userId, status: CartStatus.PENDING },
		});
		if (!existingCart) return { error: 'Carrinho pendente não encontrado.' };

		const existingItem = await db.item.findFirst({
			where: { name: data.productName, cartId: existingCart.id },
		});

		const formattedTotalPrice = multiplyNumbers(data.unitPrice, data.quantity);

		if (!existingItem) {
			const newItem = await db.item.create({
				data: {
					cartId: existingCart.id,
					name: data.productName,
					price: data.unitPrice,
					quantity: data.quantity,
					totalPrice: formattedTotalPrice,
				},
			});
			return { success: 'Item adicionado com sucesso!', newItem };
		}

		return { error: 'Item já existe no carrinho.' };
	} catch (error) {
		console.error(error);
		return { error: 'Ocorreu um erro ao tentar adicionar o item no carrinho.' };
	}
}
