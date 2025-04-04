import { auth } from '../../../../auth';
import { DashboardSection } from '../components/dashboard-section';
import { Overview } from './components/overview';

export default async function DashboardHomePage() {
	const session = await auth();
	if (!session || !session.user) return null;

	const userId = session.user.id;
	const userName = session.user.name;

	return (
		<DashboardSection>
			<Overview
				user={{
					id: userId as string,
					name: userName as string,
				}}
			/>
		</DashboardSection>
	);
}
