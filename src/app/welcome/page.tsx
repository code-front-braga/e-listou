import { redirect } from 'next/navigation';
import { auth } from '../../../auth';
import { WelcomeAnimation } from './components/welcome-animation';

export default async function WelcomePage() {
	const session = await auth();
	const userName = session?.user?.name;
	const userEmail = session?.user?.email;
	if (!session) redirect('/auth/login');

	return (
		<section className="min-h-svh w-full">
			<WelcomeAnimation
				user={{
					name: userName as string,
					email: userEmail as string,
				}}
			/>
		</section>
	);
}
