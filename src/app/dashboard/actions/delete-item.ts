'use server';

import { Prisma } from '@prisma/client';
import { auth } from '../../../../auth';
import { db } from '@/lib/db/prisma';

interface DeleteItemProps
	extends Prisma.ItemGetPayload<{ select: { id: true } }> {}

export async function deleteItem(item: DeleteItemProps) {
	const session = await auth();
	if (!session?.user?.id) return { error: 'Usuário não autenticado.' };

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
