import SiteAboutPage from './(site)/about/page';
import SiteHomePage from './(site)/home/page';
import SiteTechsPage from './(site)/techs/page';

export default function Site() {
	return (
		<>
			<SiteHomePage />
			<SiteAboutPage />
			<SiteTechsPage />
		</>
	);
}
