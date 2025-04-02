import { redirect } from 'next/navigation';
import { auth } from '../../../auth';

export default async function DashboardLayout({
	children,
}: {
	children: Readonly<React.ReactNode>;
}) {
	const session = await auth();
	if (!session) redirect('/auth/login');

	return <main className="relative min-h-screen w-full">{children}</main>;
}
