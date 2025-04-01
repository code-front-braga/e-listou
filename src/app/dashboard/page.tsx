import { redirect } from 'next/navigation';
import { auth, signOut } from '../../../auth';
import { logout } from './actions/logout';

export default async function Dashboard() {
	const session = await auth();
	if (!session) redirect('/auth/login');

	return (
		<>
			<form action={logout}>
				<button type="submit">sair</button>
			</form>
			<h1>Dashboard, {session.user?.name}</h1>;
		</>
	);
}
