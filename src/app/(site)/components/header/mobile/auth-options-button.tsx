'use client';

import { MenuToggleContext } from '@/app/(site)/contexts/menu-toggle-context';
import { useContext } from 'react';
import { SlOptionsVertical } from 'react-icons/sl';
import { AuthOptions } from './auth-options';

export function AuthOptionsButton() {
	const { toggleMenuOptions, isMenuOptionsClicked } =
		useContext(MenuToggleContext);
	return (
		<div className="relative p-1.5">
			<button type="button" onClick={toggleMenuOptions}>
				<SlOptionsVertical size={20} color="#fff" />
			</button>
			{isMenuOptionsClicked && <AuthOptions />}
		</div>
	);
}
