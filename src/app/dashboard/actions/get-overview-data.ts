'use server';

import { db } from '@/lib/db/prisma';
import { firstLetterToUpperCase } from '@/utils/first-letter-to-upper-case';
import { formatToCurrencyBRL } from '@/utils/format-to-currency-brl';
import { formatToDateBRL } from '@/utils/format-to-date-brl';
import { CartStatus } from '@prisma/client';

export async function getOverviewData(userId: string) {
	try {
		const lastPurchaseDate = await db.cart.findFirst({
			where: { userId, status: CartStatus.COMPLETED },
			orderBy: { completedAt: 'desc' },
		});

		const maxPurchaseTotal = await db.cart.findFirst({
			where: { userId, status: CartStatus.COMPLETED },
			orderBy: { total: 'desc' },
		});
		const maxPurchaseTotalFormatted = formatToCurrencyBRL(
			maxPurchaseTotal?.total ?? 0,
		);

		const aggregatedData = await db.cart.aggregate({
			where: { userId, status: CartStatus.COMPLETED },
			_sum: { total: true },
			_count: { _all: true },
		});
		const totalSpentValue = formatToCurrencyBRL(aggregatedData._sum.total || 0);
		const totalSpentFormatted = formatToCurrencyBRL(totalSpentValue);
		const totalPurchases = aggregatedData._count._all;

		const frequentItemData = await db.item.groupBy({
			where: { cart: { userId, status: CartStatus.COMPLETED } },
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
			where: { userId, status: CartStatus.COMPLETED },
			by: ['supermarket'],
			_count: { supermarket: true },
			orderBy: { _count: { supermarket: 'desc' } },
			take: 1,
		});

		const favouriteSupermarket =
			favouriteSupermarketData[0]?.supermarket || null;

		const formattedSupermarket = firstLetterToUpperCase(
			favouriteSupermarket ?? '',
		);

		return {
			lastPurchaseDate,
			maxPurchaseTotal: maxPurchaseTotalFormatted,
			totalSpent: totalSpentFormatted,
			totalPurchases,
			frequentItem,
			favouriteSupermarket: formattedSupermarket,
		};
	} catch (error) {
		console.error('Erro ao buscar dados do banco:', error);
		return null;
	}
}
