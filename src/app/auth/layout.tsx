import { redirect } from 'next/navigation';
import { auth } from '../../../auth';
import { AuthBackground } from './components/auth-background';
import { AuthTitle } from './components/auth-title';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'e-listou!',
	description: 'Seu supermercado, do seu jeito.',
	keywords: [
		'compras, supermercado, controle, economia, dinheiro, carrinho, listou, lista, app, web',
	],
	openGraph: {
		images: [`${process.env.PROJECT_URL}/open-graph.png`],
	},
	robots: {
		index: true,
		follow: true,
		nocache: true,
		googleBot: {
			index: true,
			follow: true,
			noimageindex: true,
		},
	},
};

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
