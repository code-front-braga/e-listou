import './globals.css';
import { lato, poiretOne } from '@/utils/fonts';
import { DesktopHeader } from './(site)/components/header/desktop/desktop-header';
import { MobileHeader } from './(site)/components/header/mobile/mobile-header';
import { SiteFooter } from './(site)/components/site-footer';
import { MenuToggleProvider } from './(site)/contexts/menu-toggle-context';
import { ScrollProvider } from './(site)/contexts/scroll-context';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-br">
			<body
				className={`${poiretOne.className} ${lato.className} overflow-x-hidden antialiased`}
			>
				<MenuToggleProvider>
					<ScrollProvider>
						<MobileHeader />
						<DesktopHeader />
						{children}
						<SiteFooter />
					</ScrollProvider>
				</MenuToggleProvider>
			</body>
		</html>
	);
}
