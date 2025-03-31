import { SiteSection } from '../components/site-section';
import { Content } from './components/content';

export default function SiteAboutPage() {
	return (
		<SiteSection
			id="site-about"
			className="bg-cabaret flex min-h-svh max-w-full"
		>
			<Content />
		</SiteSection>
	);
}
