'use server';

import { Prisma } from '@prisma/client';

import { db } from '@/lib/db/prisma';
import { auth } from '../../../../auth';

export async function deleteItem(
	item: Prisma.ItemGetPayload<{ select: { id: true } }>,
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
			await db.item.delete({
				where: { id: item.id },
			});

			return { success: 'Item deletado com sucesso!' };
		}

		return { error: 'Erro ao deletar o item. Tente novamente.' };
	} catch (error) {
		console.error(error);
		return { error: 'Ocorreu um erro ao deletar o item.' };
	}
}
