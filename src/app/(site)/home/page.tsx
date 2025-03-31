import { SiteBackground } from '../components/site-background';
import { SiteSection } from '../components/site-section';

export default function SiteHomePage() {
	return (
		<SiteSection id="site-home" className="bg-christalle min-h-svh w-full relative z-10">
			<SiteBackground />
		</SiteSection>
	);
}
