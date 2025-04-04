'use server';

import { db } from '@/lib/db/prisma';
import { auth } from '../../../../auth';
import { CartStatus } from '@prisma/client';

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
