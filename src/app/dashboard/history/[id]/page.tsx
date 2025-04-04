import { getDetails } from '../../services/get-details';
import { DashboardSection } from '../../components/dashboard-section';
import { Details } from './components/details';
import { auth } from '../../../../../auth';
import { db } from '@/lib/db/prisma';

interface HistoryDetailsProps {
	params: Promise<{ id: string }>;
}

export default async function HistoryDetailsPage({
	params,
}: HistoryDetailsProps) {
	const session = await auth();
	const userId = session?.user?.id;

	const { id } = await params;
	const cartData = await getDetails({ id });

	const overviewExpensive = await db.item.findFirst({
		where: { cart: { userId, id } },
		orderBy: { totalPrice: 'desc' },
	});

	const overviewCheapest = await db.item.findFirst({
		where: { cart: { userId, id } },
		orderBy: { totalPrice: 'asc' },
	});

	if (!cartData) {
		return (
			<div className="text-christalle">
				Compra não encontrada. Não foi possível carregar os detalhes.
			</div>
		);
	}

	return (
		<DashboardSection>
			<Details
				cart={cartData}
				overviewExpensive={overviewExpensive}
				overviewCheapest={overviewCheapest}
			/>
		</DashboardSection>
	);
}
