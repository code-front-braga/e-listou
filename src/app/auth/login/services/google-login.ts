import { AuthError } from 'next-auth';
import { signIn } from '../../../../../auth';

export async function googleLogin() {
	try {
		await signIn('google', {
			redirectTo: '/dashboard',
		});

		return { success: true, message: 'Usuário logado com o Google!' };
	} catch (error) {
		console.error('Erro ao tentar logar com o Google:', error);

		if (error instanceof AuthError) {
			return {
				success: false,
				message: 'Erro de autenticação: ' + error.message,
			};
		}
		return { success: false, message: 'Erro ao tentar logar com o Google' };
	}
}
