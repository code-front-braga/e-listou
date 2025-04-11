import { redirect } from 'next/navigation';
import { WelcomeAnimation } from './components/welcome-animation';
import { Metadata } from 'next';
import { auth } from '../../../auth';

export const metadata: Metadata = {
	title: 'Seja bem-vindo(a)',
	description: 'Seu supermercado, do seu jeito.',
};

export default async function WelcomePage() {
	const session = await auth();
	const userName = session?.user?.name;
	const userEmail = session?.user?.email;
	if (!session) redirect('/auth/login');

	return (
		<section className="min-h-svh w-full overflow-hidden">
			<WelcomeAnimation
				user={{
					name: userName as string,
					email: userEmail as string,
				}}
			/>
		</section>
	);
}
