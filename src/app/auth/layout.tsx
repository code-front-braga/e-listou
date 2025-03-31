import { AuthBackground } from './components/auth-background';
import { AuthTitle } from './components/auth-title';

export default function AuthLayout({
	children,
}: {
	children: Readonly<React.ReactNode>;
}) {
	return (
		<main className="flex min-h-screen w-full flex-col items-center justify-center md:flex-row">
			<AuthBackground />
			<AuthTitle />
			{children}
		</main>
	);
}
