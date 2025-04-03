'use server';

import { db } from '@/lib/db/prisma';
import { SupermarketNameData } from '@/lib/zod/cart';
import { auth } from '../../../../auth';
import { CartStatus } from '@prisma/client';
import { firstLetterToUpperCase } from '@/utils/first-letter-to-upper-case';

export async function createCart(data: SupermarketNameData) {
	const session = await auth();
	if (!session?.user?.id) {
		return { error: 'Usuário não autenticado.' };
	}

	try {
		const existingCart = await db.cart.findFirst({
			where: { userId: session?.user?.id, status: CartStatus.PENDING },
		});
		if (existingCart)
			return { error: 'Existe um carrinho pendente. Finalize-o primeiro.' };

		const formattedSupermarketName = firstLetterToUpperCase(
			data.supermarketName,
		);

		await db.cart.create({
			data: {
				userId: session?.user?.id,
				supermarket: formattedSupermarketName,
				status: CartStatus.PENDING,
				total: 0,
			},
		});

		return {
			success: 'Carrinho criado com sucesso! Comece a adicionar produtos.',
		};
	} catch (error) {
		return { error: 'Erro interno ao criar o carrinho. Tente novamente.' };
	}
}
