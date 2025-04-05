'use server';

import { auth } from '../../../../auth';
import { db } from '@/lib/db/prisma';
import { Prisma } from '@prisma/client';

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
			await db.item.update({
				where: { id: item.id },
				data: { price: item.price, quantity: item.quantity },
			});

			return { success: 'Item editado com sucesso!' };
		}

		return { error: 'Erro ao editar o item. Tente novamente.' };
	} catch (error) {
		console.error(error);
		return { error: 'Ocorreu um erro ao editaro item.' };
	}
}
