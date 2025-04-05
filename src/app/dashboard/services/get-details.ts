import { CartStatus, Prisma } from '@prisma/client';
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

	if (!existingCart) throw new Error('Carrinho não encontrado.');

	if (existingCart.userId !== userId)
		throw new Error('Usuário não autorizado a acessar este carrinho.');

	if (existingCart.status !== CartStatus.COMPLETED)
		throw new Error('Este carrinho ainda não está concluído.');

	return existingCart;
}
