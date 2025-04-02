import { Toaster } from '@/components/ui/sonner';
import './globals.css';
import { lato, poiretOne } from '@/utils/fonts';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-br">
			<body
				className={`${poiretOne.className} ${lato.className} min-h-svh antialiased`}
			>
				{children}
				<Toaster richColors />
			</body>
		</html>
	);
}
