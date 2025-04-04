import { getAllCompletedCart } from '../services/get-all-completed-cart';
import { DashboardSection } from '../components/dashboard-section';
import { HistoriesList } from './components/histories-list';
import { SearchCompletedCart } from './components/search-completed-cart';
import { HistoryProvider } from './contexts/history';

export default async function DashboardHistoryPage() {
	const carts = await getAllCompletedCart();

	if (!carts) {
		return (
			<p className="text-cabaret font-semibold">
				Nenhum carrinho foi concluído.
			</p>
		);
	}

	return (
		<HistoryProvider>
			<DashboardSection>
				<div className="flex h-full w-full flex-col items-center gap-6 overflow-hidden">
					<SearchCompletedCart carts={carts} />
					<HistoriesList carts={carts} />
				</div>
			</DashboardSection>
		</HistoryProvider>
	);
}
