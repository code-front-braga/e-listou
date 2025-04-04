'use client';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { formatToCurrencyBRL } from '@/utils/format-to-currency-brl';
import { Item, Prisma } from '@prisma/client';
import Link from 'next/link';
import { LuHistory } from 'react-icons/lu';
import { Header } from './header';
import { Separator } from '@/components/ui/separator';
import Overview from './overview';

interface DetailsProps {
	cart: Prisma.CartGetPayload<{ include: { items: true } }>;
	overviewExpensive: Item | null;
	overviewCheapest: Item | null;
}

export function Details({
	cart,
	overviewExpensive,
	overviewCheapest,
}: DetailsProps) {
	return (
		<>
			<Header cart={cart} />
			<Separator className="bg-christalle/10" />

			<main className="flex h-full flex-col justify-between overflow-hidden">
				<div className="flex h-[70%] flex-col">
					<div className="text-cabaret mb-2 flex items-center justify-between text-base font-semibold">
						<span>Itens</span>
						<span>Total: {formatToCurrencyBRL(cart.total)}</span>
					</div>

					<ScrollArea type="auto" className="h-full">
						<ul className="text-christalle flex flex-col gap-3 pr-4 text-sm">
							{cart.items.map(item => (
								<li
									key={item.id}
									className="border-christalle/25 flex items-center justify-between rounded-lg border-1 px-2.5 py-1.5 last:mb-2"
								>
									<div className="flex flex-col">
										<span>Produto: {item.name}</span>
										<span>
											Preço unitário: {formatToCurrencyBRL(item.price)}
										</span>
										<span>Quantidade: {item.quantity}</span>
									</div>
									<span>Total: {formatToCurrencyBRL(item.totalPrice)}</span>
								</li>
							))}
						</ul>
						<ScrollBar className="bg-christalle/20 rounded" />
					</ScrollArea>
				</div>
				<Separator className="bg-christalle/10" />
				<Overview
					overviewExpensive={overviewExpensive}
					overviewCheapest={overviewCheapest}
				/>
				<Link
					href="/dashboard/history"
					className="text-christalle flex items-center gap-2 self-end font-semibold"
				>
					<span>Histórico</span>
					<LuHistory size={24} className="text-cabaret" />
				</Link>
			</main>
		</>
	);
}
