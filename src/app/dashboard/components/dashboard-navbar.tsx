'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { SitePagesProps } from '@/app/(site)/components/header/mobile/mobile-navbar';
import { dashboardLinks } from '../constants/dashboard-links';

export default function DashboarNavbar() {
	const pathName = usePathname();

	const handleActiveLink = (link: Pick<SitePagesProps, 'url'>) => {
		if (link.url !== pathName) {
			return 'text-white';
		}
		return 'text-christalle';
	};

	const dashLinks = dashboardLinks.map(link => {
		return (
			<Link
				key={link.url}
				href={link.url}
				onClick={() => handleActiveLink(link)}
				className={`flex flex-col items-center ${handleActiveLink(link)}`}
			>
				{link.icon && <link.icon size={28} />}
			</Link>
		);
	});

	return (
		<nav className="bg-cabaret flex h-18 w-full items-center justify-between px-4">
			{dashLinks}
		</nav>
	);
}
