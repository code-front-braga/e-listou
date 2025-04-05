'use client';

import { Prisma } from '@prisma/client';
import { LogoutForm } from './logout-form';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FaUserAltSlash } from 'react-icons/fa';
import { RiArrowDownSLine } from 'react-icons/ri';
import { useState } from 'react';
import { ConfirmDialog } from '@/components/confirm-dialog';
import { deleteUserAccount } from '../actions/delete-account';
import { showPromiseToast } from '@/components/promise-toast';
import { signOut } from 'next-auth/react';

interface DashboardHeaderProps {
	user: Prisma.UserGetPayload<{
		select: { name: true; email: true };
	}>;
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
	const [
		isDeleteUserAccountButtonClicked,
		setIsDeleteUserAccountButtonClicked,
	] = useState<boolean>(false);

	async function handleDeleteUserAccount() {
		const resPromise = deleteUserAccount({ email: user.email });
		showPromiseToast({
			loading: 'Excluindo conta...',
			promise: resPromise,
		});

		const res = await resPromise;

		if (res.success) {
			await signOut({ redirectTo: '/auth/login' });
		} else if (res.error) {
			console.log(res.error);
		}
	}

	return (
		<>
			<header className="bg-christalle flex h-24 w-full px-4">
				<div className="m-auto flex w-full items-center justify-between">
					<div className="w-auto">
						<p className="truncate overflow-hidden text-lg text-ellipsis whitespace-nowrap text-white">
							Olá,
						</p>
						<DropdownMenu>
							<DropdownMenuTrigger className="bg-moonRaker/25 flex w-full items-center justify-between gap-1.5 rounded p-1 px-1.5 text-white outline-0">
								<span className="truncate overflow-hidden text-sm text-ellipsis whitespace-nowrap">
									{user.name}
								</span>
								<RiArrowDownSLine size={18} />
							</DropdownMenuTrigger>
							<DropdownMenuContent className="bg-cabaret flex items-center border-0 text-white">
								<DropdownMenuLabel
									onClick={() => setIsDeleteUserAccountButtonClicked(true)}
									className="cursor-pointer"
								>
									Excluir Conta
								</DropdownMenuLabel>
								<FaUserAltSlash size={18} />
							</DropdownMenuContent>
						</DropdownMenu>
						<span className="truncate overflow-hidden text-sm text-ellipsis whitespace-nowrap text-white">
							{user.email}
						</span>
					</div>
					<LogoutForm />
				</div>
			</header>

			{isDeleteUserAccountButtonClicked && (
				<ConfirmDialog
					title="Atenção!"
					description="Todos os seus dados serão perdidos. Tem certeza que deseja prosseguir?"
					handleFunction={handleDeleteUserAccount}
					isCancelDialogOpen={isDeleteUserAccountButtonClicked}
					setIsCancelDialogOpen={setIsDeleteUserAccountButtonClicked}
				/>
			)}
		</>
	);
}
