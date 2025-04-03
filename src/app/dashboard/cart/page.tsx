import { DashboardSection } from '../components/dashboard-section';
import { AllSteps } from './components/all-steps';
import { CartProvider } from './contexts/cart';

export default function DashboardCartPage() {
	return (
		<DashboardSection>
			<CartProvider>
				<AllSteps />
			</CartProvider>
		</DashboardSection>
	);
}
