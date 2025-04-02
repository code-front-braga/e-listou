import Form from 'next/form';
import { logout } from '../actions/logout';
import { SlLogout } from 'react-icons/sl';

export function LogoutForm() {
	return (
		<Form action={logout}>
			<button
				type="submit"
				className="text-cabaret flex flex-col items-end gap-1"
			>
				<SlLogout size={22} />
				<span className="text-cabaret">Sair</span>
			</button>
		</Form>
	);
}
