'use client';

import {
	createContext,
	useContext,
	useEffect,
	useState,
	useCallback,
	useMemo,
} from 'react';

interface LandingPagesProps {
	name: string;
	url: string;
}

interface ScrollContextProps {
	activeHash: string;
	setActiveHash: (hash: string) => void;
}

export const ScrollContext = createContext<ScrollContextProps | undefined>(
	undefined,
);

export function ScrollProvider({ children }: { children: React.ReactNode }) {
	const [activeHash, setActiveHash] = useState<string>('');

	const pages: LandingPagesProps[] = useMemo(
		() => [
			{ name: 'Home', url: '#site-home' },
			{ name: 'About', url: '#site-about' },
			{ name: 'Techs', url: '#site-techs' },
		],
		[],
	);

	const handleScroll = useCallback(() => {
		requestAnimationFrame(() => {
			const scrollPosition = window.scrollY;

			for (const page of pages) {
				const section = document.querySelector(page.url) as HTMLElement | null;
				if (section) {
					const { offsetTop, offsetHeight } = section;

					if (
						scrollPosition >= offsetTop - 50 &&
						scrollPosition < offsetTop + offsetHeight - 50
					) {
						setActiveHash(page.url);
						break;
					}
				}
			}
		});
	}, [pages]);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		handleScroll();

		return () => window.removeEventListener('scroll', handleScroll);
	}, [handleScroll]);

	return (
		<ScrollContext.Provider value={{ activeHash, setActiveHash }}>
			{children}
		</ScrollContext.Provider>
	);
}

export function useScroll() {
	const context = useContext(ScrollContext);
	if (!context) {
		throw new Error('useScroll deve ser usado dentro de um ScrollProvider');
	}
	return context;
}
