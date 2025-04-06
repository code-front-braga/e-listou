import { ConfirmDialog } from '@/components/confirm-dialog';
import { formatToCurrencyBRL } from '@/utils/format-to-currency-brl';
import { formatToDateBRL } from '@/utils/format-to-date-brl';
import { Prisma } from '@prisma/client';
import Link from 'next/link';
import { BiSolidPurchaseTag } from 'react-icons/bi';
import { useDeletePurchase } from '../hooks/delete-purchase-hook';
import { ImSpinner } from 'react-icons/im';
import { IoMdListBox } from 'react-icons/io';

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
	const {
		handleDeletePurchase,
		isLoading,
		showConfirmModal,
		setShowConfirmModal,
	} = useDeletePurchase({
		id: history.id,
	});
	return (
		<>
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
					<div className="flex flex-col items-end gap-4">
						<Link
							href={`/dashboard/history/${history.id}`}
							className="text-christalle flex items-center gap-2 font-semibold"
						>
							<span>Ver Detalhes</span>
							<IoMdListBox size={18} />
						</Link>

						<button
							type="button"
							onClick={() => setShowConfirmModal(true)}
							className="text-cabaret flex items-center gap-2 font-semibold"
						>
							{isLoading ? (
								<>
									<span>Deletando...</span>
									<ImSpinner size={18} className="animate-spin" />
								</>
							) : (
								<>
									<span>Deletar compra</span>
									<BiSolidPurchaseTag size={18} />
								</>
							)}
						</button>
					</div>
				</div>
			</li>

			{showConfirmModal && (
				<ConfirmDialog
					title="Atenção!"
					description="Você tem certeza que deseja deletar este registro de compra?"
					handleFunction={handleDeletePurchase}
					isCancelDialogOpen={showConfirmModal}
					setIsCancelDialogOpen={setShowConfirmModal}
				/>
			)}
		</>
	);
}
