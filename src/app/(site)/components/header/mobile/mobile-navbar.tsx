'use client';

import Link from 'next/link';
import { useContext } from 'react';
import { motion } from 'motion/react';
import { useScroll } from '@/app/(site)/contexts/scroll-context';
import { MenuToggleContext } from '@/app/(site)/contexts/menu-toggle-context';
import { IconType } from 'react-icons';
import { HiHome } from 'react-icons/hi';
import { BsInfoCircleFill } from 'react-icons/bs';
import { IoMdSettings } from 'react-icons/io';

export interface SitePagesProps {
	name?: string;
	url: string;
	icon?: IconType;
}

export const pages: SitePagesProps[] = [
	{ name: 'Home', url: '#site-home', icon: HiHome },
	{ name: 'Sobre', url: '#site-about', icon: BsInfoCircleFill },
	{ name: 'Tech', url: '#site-techs', icon: IoMdSettings },
];

export function Navbar() {
	const { activeHash, setActiveHash } = useScroll();
	const { toggleMenu } = useContext(MenuToggleContext);

	const handleClick = (
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
			toggleMenu();
		}
	};

	const pagesLink = pages.map(page => {
		const isActive = activeHash === page.url;
		const linkTextColor = isActive ? 'text-christalle' : 'text-cabaret';

		return (
			<Link key={page.url} href={page.url} onClick={e => handleClick(e, page)}>
				{page.icon && (
					<page.icon
						size={22}
						className={`flex items-center font-semibold ${linkTextColor}`}
					/>
				)}
			</Link>
		);
	});

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{
				duration: 0.6,
				delay: 0.4,
				ease: 'anticipate',
				type: 'spring',
			}}
		>
			<nav className="font-gantari bg-moonRaker absolute top-14 left-0 flex gap-5 rounded-sm p-3 shadow-2xl">
				{pagesLink}
			</nav>
		</motion.div>
	);
}
