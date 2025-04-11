import { db } from '@/lib/db/prisma';
import { CartStatus } from '@prisma/client';
import { auth } from '../../../../auth';

export async function getAllCompletedCart() {
	const session = await auth();
	const userId = session?.user?.id;

	if (!userId) return null;

	try {
		const existingCarts = await db.cart.findMany({
			where: { userId, status: CartStatus.COMPLETED },
			orderBy: { completedAt: 'desc' },
			include: { items: true },
		});

		return existingCarts;
	} catch (error) {
		console.error(error);
	}
}
