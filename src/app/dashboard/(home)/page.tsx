import { auth } from '../../../../auth';
import { DashboardSection } from '../components/dashboard-section';
import { Overview } from './components/overview';

export default async function DashboardHomePage() {
	const session = await auth();

	return (
		<DashboardSection>
			<Overview
				user={{
					id: session?.user?.id as string,
					name: session?.user?.name as string,
				}}
			/>
		</DashboardSection>
	);
}
