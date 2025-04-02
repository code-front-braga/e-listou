import { redirect } from 'next/navigation';
import { auth } from '../../../auth';
import { DashboardHeader } from './components/dashboard-header';
import DashboarNavbar from './components/dashboard-navbar';

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
