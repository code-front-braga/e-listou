import { Metadata } from 'next';
import { AuthContainer } from '../components/auth-container';
import { AuthFooter } from '../components/auth-footer';
import { AuthSection } from '../components/auth-section';
import { RegisterForm } from './components/register-form';
import { RegisterProvider } from './context/register-context';

export const metadata: Metadata = {
	title: 'Cadastro - e-Listou',
	description: 'Cadastre-se agora mesmo',
};

export default function RegisterPage() {
	return (
		<AuthSection>
			<AuthContainer>
				<RegisterProvider>
					<RegisterForm />
				</RegisterProvider>
			</AuthContainer>

			<AuthFooter
				href="/auth/login"
				paragraphText="Já possui uma conta?"
				linkText="Faça seu login"
			/>
		</AuthSection>
	);
}
