import { DesktopHeader } from './components/header/desktop/desktop-header';
import { MobileHeader } from './components/header/mobile/mobile-header';
import { SiteBackground } from './components/site-background';
import { SiteFooter } from './components/site-footer';
import { MenuToggleProvider } from './contexts/menu-toggle-context';
import { ScrollProvider } from './contexts/scroll-context';

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
