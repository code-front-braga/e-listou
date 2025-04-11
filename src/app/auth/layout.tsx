import { redirect } from 'next/navigation';
import { auth } from '../../../auth';
import { AuthBackground } from './components/auth-background';
import { AuthTitle } from './components/auth-title';

export default async function AuthLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const session = await auth();
	if (session) redirect('/dashboard');

	return (
		<main className="flex min-h-screen w-full flex-col items-center justify-center overflow-hidden md:flex-row">
			<AuthBackground />
			<AuthTitle />
			{children}
		</main>
	);
}
