'use client';

import { Prisma } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { deleteCompletedCart } from '../../actions/delete-completed-cart';
import { showPromiseToast } from '@/components/promise-toast';

export function useDeletePurchase(
	cart: Prisma.CartGetPayload<{ select: { id: true } }>,
) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

	async function handleDeletePurchase() {
		setIsLoading(true);
		setShowConfirmModal(false);

		const resPromise = deleteCompletedCart({ id: cart.id });
		showPromiseToast({ loading: 'Deletando...', promise: resPromise });

		try {
			const res = await resPromise;
			if (res.success) {
				router.push('/dashboard/history');
			} else if (res.error) {
				console.error(res.error);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	}

	return {
		handleDeletePurchase,
		isLoading,
		showConfirmModal,
		setShowConfirmModal,
	};
}
