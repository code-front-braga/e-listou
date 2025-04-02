import { Cart, User } from '@prisma/client';
import { getOverviewData } from '../../actions/get-overview-data';
import { formatToDateBRL } from '@/utils/format-to-date-brl';
import { OverviewItem } from './overview-item';
import Link from 'next/link';
import { FullTime } from './full-time';
import { WelcomeScreen } from './welcome-screen';

interface OverviewProps {
	user: Pick<User, 'name' | 'id'>;
}

interface OverviewItem {
	title: string;
	description: string;
	cartData?: Cart | null;
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
			description: overviewData.lastPurchaseDate
				? `${formatToDateBRL(overviewData.lastPurchaseDate?.completedAt)}, no ${overviewData.lastPurchaseDate?.supermarket}`
				: '',
		},
		{
			title: 'Compra de Maior Valor',
			description: overviewData.maxPurchaseTotal,
		},
	];

	const overviewList = overviewItens.map((overviewItem, index) => {
		return (
			<OverviewItem
				key={index}
				title={overviewItem.title}
				description={overviewItem.description}
			>
				{index < 2 &&
					overviewData.lastPurchaseDate &&
					overviewData.lastPurchaseDate?.total > 0 && (
						<Link
							href={`/dashboard/history/${overviewData.lastPurchaseDate.id}`}
							className="text-cabaret font-semibold"
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
