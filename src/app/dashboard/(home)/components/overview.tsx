import { Cart, User } from '@prisma/client';
import { getOverviewData } from '../../actions/get-overview-data';
import { formatToDateBRL } from '@/utils/format-to-date-brl';
import { OverviewItem } from './overview-item';
import Link from 'next/link';
import { FullTime } from './full-time';
import { WelcomeScreen } from './welcome-screen';
import { formatToCurrencyBRL } from '@/utils/format-to-currency-brl';

interface OverviewProps {
	user: Pick<User, 'name' | 'id'>;
}

interface OverviewItem {
	title: string;
	description: string | number;
	cartData?: Cart;
}

export async function Overview({ user }: OverviewProps) {
	const overviewData = await getOverviewData(user.id);

	if (!overviewData) {
		return <p>Erro ao carregar dados!</p>;
	}

	if (overviewData.totalPurchases === 0)
		return <WelcomeScreen user={user.name as string} />;

	const overviewItens: OverviewItem[] = [
		{
			title: 'Última Compra Realizada',
			description: `${formatToDateBRL(overviewData.lastPurchaseDate?.completedAt ?? null)}, no ${overviewData.lastPurchaseDate?.supermarket}`,
		},
		{
			title: 'Compra de Maior Valor',
			description: formatToCurrencyBRL(overviewData.maxPurchaseTotal ?? 0),
		},
		{
			title: 'Total de Compras',
			description: `${overviewData.totalPurchases} compra${overviewData.totalPurchases > 1 ? 's' : ''}`,
		},
		{
			title: 'Valor Total Gasto',
			description: formatToCurrencyBRL(overviewData.totalSpent),
		},
		{
			title: 'Supermercado Favorito',
			description: overviewData.favouriteSupermarket,
		},
		{
			title: 'Produto Mais Comprado',
			description: overviewData.frequentItem?.name ?? '',
		},
	];

	const overviewList = overviewItens.map((overviewItem, index) => {
		return (
			<OverviewItem
				key={index}
				title={overviewItem.title}
				description={overviewItem.description as string}
			>
				{index < 2 &&
					overviewData.lastPurchaseDate &&
					overviewData.lastPurchaseDate?.total > 0 && (
						<Link
							href={`/dashboard/history/${overviewData.lastPurchaseDate.id}`}
							className="text-cabaret text-sm font-semibold"
						>
							Ver Detalhes
						</Link>
					)}
			</OverviewItem>
		);
	});

	return (
		<article className="flex flex-col gap-2 overflow-y-auto">
			<div className="flex items-center justify-between">
				<h3 className="text-christalle text-left font-semibold">Visão Geral</h3>
				<FullTime />
			</div>
			{overviewList}
		</article>
	);
}
