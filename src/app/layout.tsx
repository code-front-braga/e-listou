import './globals.css';
import { lato, poiretOne } from './utils/fonts';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-br">
			<body
				className={`${poiretOne.className} ${lato.className} min-h-svh w-full antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
