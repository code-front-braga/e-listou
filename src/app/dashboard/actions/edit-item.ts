'use server';

import { db } from '@/lib/db/prisma';
import { multiplyNumbers } from '@/utils/mutiply-numbers';
import { Prisma } from '@prisma/client';
import { auth } from '../../../../auth';

export async function editItem(
	item: Prisma.ItemGetPayload<{
		select: { id: true; price: true; quantity: true };
	}>,
) {
	const session = await auth();
	const userId = session?.user?.id;
	if (!userId) return { error: 'Usuário não autenticado.' };

	try {
		const existingItem = await db.item.findFirst({
			where: { id: item.id },
			include: { cart: true },
		});

		if (existingItem) {
			const totalPrice = multiplyNumbers(item.price, item.quantity);

			await db.item.update({
				where: { id: item.id },
				data: {
					price: item.price,
					quantity: item.quantity,
					totalPrice: totalPrice,
				},
			});

			return { success: 'Item editado com sucesso!' };
		}

		return { error: 'Erro ao editar o item. Tente novamente.' };
	} catch (error) {
		console.error(error);
		return { error: 'Ocorreu um erro ao editaro item.' };
	}
}
