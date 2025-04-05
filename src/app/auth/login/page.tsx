import { Metadata } from 'next';
import { AuthContainer } from '../components/auth-container';
import { AuthFooter } from '../components/auth-footer';
import { AuthSection } from '../components/auth-section';
import { FormTitle } from '../components/form-title';
import { CredentialsLoginForm } from './components/cedentials-login-form';
import { GoogleLoginForm } from './components/google-login-form';

export const metadata: Metadata = {
	title: 'Login - e-Listou',
	description: 'Faça login na nossa plataforma web',
};

export default function LoginPage() {
	return (
		<AuthSection>
			<AuthContainer>
				<FormTitle title="Seja Bem-vindo!" />
				<CredentialsLoginForm />
				<GoogleLoginForm />
			</AuthContainer>

			<AuthFooter
				href="/auth/register"
				paragraphText="Não possui uma conta?"
				linkText="Cadastre-se"
			/>
		</AuthSection>
	);
}
