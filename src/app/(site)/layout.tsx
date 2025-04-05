import { Metadata } from 'next';
import { DesktopHeader } from './components/header/desktop/desktop-header';
import { MobileHeader } from './components/header/mobile/mobile-header';
import { SiteBackground } from './components/site-background';
import { SiteFooter } from './components/site-footer';
import { MenuToggleProvider } from './contexts/menu-toggle-context';
import { ScrollProvider } from './contexts/scroll-context';

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

export default function SiteLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<main className="min-h-svh w-full overflow-hidden">
			<MenuToggleProvider>
				<ScrollProvider>
					<SiteBackground />
					<MobileHeader />
					<DesktopHeader />
					{children}
					<SiteFooter />
				</ScrollProvider>
			</MenuToggleProvider>
		</main>
	);
}
