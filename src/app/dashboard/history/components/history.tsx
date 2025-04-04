import { formatToCurrencyBRL } from '@/utils/format-to-currency-brl';
import { formatToDateBRL } from '@/utils/format-to-date-brl';
import { Prisma } from '@prisma/client';
import Link from 'next/link';

interface HistoryProps {
	history: Prisma.CartGetPayload<{
		select: {
			id: true;
			supermarket: true;
			total: true;
			completedAt: true;
		};
	}>;
}

export function History({ history }: HistoryProps) {
	return (
		<li className="bg-moonRaker/80 text-christalle flex items-center gap-5 rounded p-2.5 px-3.5 text-sm font-semibold">
			<div className="flex w-full items-center justify-between">
				<div className="flex flex-col items-start gap-1 text-sm">
					<p>
						Supermercado: <span>{history.supermarket}</span>
					</p>
					<p>
						Data: <span>{formatToDateBRL(history.completedAt)}</span>
					</p>
					<p>
						Total: <span>{formatToCurrencyBRL(history.total)}</span>
					</p>
				</div>
				<Link
					href={`/dashboard/history/${history.id}`}
					className="text-cabaret font-semibold"
				>
					Ver Detalhes
				</Link>
			</div>
		</li>
	);
}
