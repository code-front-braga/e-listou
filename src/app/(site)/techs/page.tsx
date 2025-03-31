import { SiteSection } from '../components/site-section';
import { Content } from './components/content';

export default function SiteTechsPage() {
	return (
		<SiteSection
			id="site-techs"
			className="bg-christalle/80 relative z-10 flex min-h-svh max-w-full"
		>
			<Content />
		</SiteSection>
	);
}
