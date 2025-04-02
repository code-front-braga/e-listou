import { redirect } from 'next/navigation';
import { auth } from '../../../auth';
import { WelcomeAnimation } from './components/welcome-animation';
import { db } from '@/lib/db/prisma';

export default async function WelcomePage() {
	const session = await auth();
	if (!session) redirect('/auth/login');

	return (
		<WelcomeAnimation
			user={{
				name: session.user?.name as string,
				email: session.user?.email as string,
			}}
		/>
	);
}
