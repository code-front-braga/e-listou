import { formatToCurrencyBRL } from '@/utils/format-to-currency-brl';
import { Item } from '@prisma/client';

interface OverviewProps {
	overviewExpensive: Item | null;
	overviewCheapest: Item | null;
}

export default function Overview({
	overviewExpensive,
	overviewCheapest,
}: OverviewProps) {
	return (
		<article className="flex items-center justify-between text-sm font-semibold">
			{overviewExpensive && (
				<div>
					<p className="text-cabaret">Produto mais caro:</p>
					<span className="text-christalle">
						{overviewExpensive.name},{' '}
						{formatToCurrencyBRL(overviewExpensive.price)}
					</span>
				</div>
			)}
			{overviewCheapest && (
				<div>
					<p className="text-cabaret">Produto mais barato:</p>
					<span className="text-christalle">
						{overviewCheapest.name},{' '}
						{formatToCurrencyBRL(overviewCheapest.price)}
					</span>
				</div>
			)}
		</article>
	);
}
