import { Prisma } from '@prisma/client';
import { LogoutForm } from './logout-form';

interface DashboardHeaderProps {
	user: Prisma.UserGetPayload<{ select: { name: true; email: true } }>;
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
	return (
		<header className="bg-christalle flex h-24 w-full px-4">
			<div className="m-auto flex w-full items-center justify-between">
				<div className="w-1/2">
					<p className="truncate overflow-hidden text-lg text-ellipsis whitespace-nowrap text-white">
						Olá,
						<br />
						{user.name}
					</p>
					<span className="truncate overflow-hidden text-sm text-ellipsis whitespace-nowrap text-white">
						{user.email}
					</span>
				</div>
				<LogoutForm />
			</div>
		</header>
	);
}
