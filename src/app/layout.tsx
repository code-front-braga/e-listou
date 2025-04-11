import { Toaster } from '@/components/ui/sonner';
import './globals.css';
import { lato, poiretOne } from '@/utils/fonts';
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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-br">
			<body className={`${poiretOne.className} ${lato.className} antialiased`}>
				{children}
				<Toaster richColors />
			</body>
		</html>
	);
}
