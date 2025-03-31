import { SiteBackground } from '../components/site-background';
import { SiteSection } from '../components/site-section';
import { BackgroundEffect } from './components/background-effect';
import { Content } from './components/content';

export default function SiteHomePage() {
	return (
		<SiteSection
			id="site-home"
			className="bg-christalle relative z-10 flex min-h-svh w-full"
		>
			<SiteBackground />
			<BackgroundEffect />
			<Content />
		</SiteSection>
	);
}
