'use server';

import { auth } from '../../../../auth';
import { db } from '@/lib/db/prisma';
import { Prisma } from '@prisma/client';

interface EditItemProps
	extends Prisma.ItemGetPayload<{
		select: { id: true; price: true; quantity: true };
	}> {}

export async function editItem(item: EditItemProps) {
	const session = await auth();
	if (!session?.user?.id) return { error: 'Usuário não autenticado.' };

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
