import { Prisma } from '@prisma/client';
import { auth } from '../../../../auth';
import { db } from '@/lib/db/prisma';

export async function getDetails(
	cart: Prisma.CartGetPayload<{ select: { id: true } }>,
) {
	const session = await auth();
	const userId = session?.user?.id;

	if (!userId) throw new Error('Usuário não encontrado');

	const existingCart = await db.cart.findUnique({
		where: { id: cart.id, userId },
		include: { items: true },
	});

	return existingCart;
}
