import { redirect } from 'next/navigation';
import { DashboardHeader } from './components/dashboard-header';
import DashboarNavbar from './components/dashboard-navbar';
import { Metadata } from 'next';
import { auth } from '../../../auth';

export const metadata: Metadata = {
	title: 'e-listou! - Dashboard',
	description: 'Controle suas compras',
};

export default async function DashboardLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const session = await auth();
	if (!session) redirect('/auth/login');

	return (
		<main className="relative min-h-screen w-full">
			<DashboardHeader
				user={{
					name: session.user?.name as string,
					email: session.user?.email as string,
				}}
			/>
			{children}
			<DashboarNavbar />
		</main>
	);
}
