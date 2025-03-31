'use client';

import { MobileHeaderContainer } from './mobile-header-container';
import { MenuButton } from './menu-button';
import { useScroll } from '@/app/(site)/contexts/scroll-context';
import clsx from 'clsx';
import { AuthOptionsButton } from './auth-options-button';

export function MobileHeader() {
	const { activeHash } = useScroll();

	return (
		<header
			className={clsx('fixed z-50 h-20 w-full rounded-b-3xl md:hidden', {
				'bg-cadetBlue/65 shadow-xl backdrop-blur-sm': activeHash === '#about',
				'bg-christalle/65 shadow-xl backdrop-blur-sm': activeHash === '#techs',
			})}
		>
			<MobileHeaderContainer>
				<MenuButton />
				<AuthOptionsButton />
			</MobileHeaderContainer>
		</header>
	);
}
