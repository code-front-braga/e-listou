'use server';

import { db } from '@/lib/db/prisma';
import { CartStatus, Prisma } from '@prisma/client';

export async function getOverviewData(
	user: Prisma.UserGetPayload<{ select: { id: true } }>,
) {
	try {
		const lastPurchaseDate = await db.cart.findFirst({
			where: { userId: user.id, status: CartStatus.COMPLETED },
			orderBy: { completedAt: 'desc' },
		});

		const maxPurchaseTotal = await db.cart.findFirst({
			where: { userId: user.id, status: CartStatus.COMPLETED },
			orderBy: { total: 'desc' },
		});

		const aggregatedData = await db.cart.aggregate({
			where: { userId: user.id, status: CartStatus.COMPLETED },
			_sum: { total: true },
			_count: { _all: true },
		});
		const totalSpent = aggregatedData._sum.total || 0;
		const totalPurchases = aggregatedData._count._all || 0;

		const frequentItemData = await db.item.groupBy({
			where: { cart: { userId: user.id, status: CartStatus.COMPLETED } },
			by: ['id'],
			_count: { id: true },
			orderBy: { _count: { id: 'desc' } },
			take: 1,
		});

		let frequentItem = null;
		if (frequentItemData && frequentItemData[0]) {
			frequentItem = await db.item.findUnique({
				where: { id: frequentItemData[0].id },
			});
		}

		const favouriteSupermarketData = await db.cart.groupBy({
			where: { userId: user.id, status: CartStatus.COMPLETED },
			by: ['supermarket'],
			_count: { supermarket: true },
			orderBy: { _count: { supermarket: 'desc' } },
			take: 1,
		});

		const favouriteSupermarket = favouriteSupermarketData[0]?.supermarket;

		return {
			lastPurchaseDate,
			maxPurchaseTotal: maxPurchaseTotal?.total,
			totalSpent,
			totalPurchases,
			frequentItem,
			favouriteSupermarket,
		};
	} catch (error) {
		console.error('Erro ao buscar dados do banco:', error);
		return null;
	}
}
