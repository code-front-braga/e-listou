'use client';

import { formatToDateBRL } from '@/utils/format-to-date-brl';
import { Prisma } from '@prisma/client';
import { BiSolidPurchaseTag } from 'react-icons/bi';
import { useDeletePurchase } from '../../hooks/delete-purchase-hook';
import { ConfirmDialog } from '@/components/confirm-dialog';
import { ImSpinner } from 'react-icons/im';

interface HeaderProps {
	cart: Prisma.CartGetPayload<{
		select: { supermarket: true; completedAt: true; id: true };
	}>;
}

export function Header({ cart }: HeaderProps) {
	const {
		handleDeletePurchase,
		isLoading,
		showConfirmModal,
		setShowConfirmModal,
	} = useDeletePurchase({
		id: cart.id,
	});

	return (
		<>
			<header className="text-christalle flex w-full items-center justify-between">
				<div>
					<h3 className="text-christalle">Detalhes da compra:</h3>
					<div className="flex items-center gap-1 text-sm">
						<span className="text-cabaret">Supermercado:</span>
						<span>{cart.supermarket}</span>
					</div>
					<div className="flex items-center gap-1 text-sm">
						<span className="text-cabaret">Data da Compra:</span>
						<span>{formatToDateBRL(cart.completedAt)}</span>
					</div>
				</div>
				<button
					onClick={() => setShowConfirmModal(true)}
					className="text-cabaret text-sm flex items-center gap-2 font-semibold"
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
			</header>

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
