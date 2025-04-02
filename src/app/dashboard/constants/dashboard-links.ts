import { SitePagesProps } from '@/app/(site)/components/header/mobile/mobile-navbar';
import { HiHome } from 'react-icons/hi';
import { FaOpencart } from 'react-icons/fa';
import { LuHistory } from 'react-icons/lu';

export const dashboardLinks: SitePagesProps[] = [
	{
		url: '/dashboard',
		icon: HiHome,
	},
	{
		url: '/dashboard/cart',
		icon: FaOpencart,
	},
	{
		url: '/dashboard/history',
		icon: LuHistory,
	},
];
