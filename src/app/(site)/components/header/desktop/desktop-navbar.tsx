'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { useScroll } from '@/app/(site)/contexts/scroll-context';
import { pages, SitePagesProps } from '../mobile/mobile-navbar';

export function NavbarDesktop() {
	const { activeHash, setActiveHash } = useScroll();

	const handleClickLink = (
		e: React.MouseEvent<HTMLAnchorElement>,
		page: SitePagesProps,
	) => {
		e.preventDefault();

		const section = document.querySelector(page.url) as HTMLElement | null;
		if (section) {
			window.scrollTo({
				top: section.offsetTop,
				behavior: 'smooth',
			});
			setActiveHash(page.url);
		}
	};

	const pagesLink = pages.map(page => {
		const isActive = activeHash === page.url;
		const linkTextColor = isActive ? 'text-white' : 'text-cabaret';

		return (
			<Link
				key={page.url}
				href={page.url}
				onClick={e => handleClickLink(e, page)}
				className={clsx(linkTextColor)}
			>
				{page.name}
			</Link>
		);
	});

	return (
		<nav className="bg-christalle flex items-center justify-center gap-3 rounded-lg p-2 px-4">
			{pagesLink}
		</nav>
	);
}
