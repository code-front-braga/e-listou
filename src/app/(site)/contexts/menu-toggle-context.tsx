'use client';

import { createContext, useState } from 'react';

interface IMenuToggleContext {
	isMenuClicked: boolean;
	toggleMenu: () => void;
	isMenuOptionsClicked: boolean;
	toggleMenuOptions: () => void;
}

export const MenuToggleContext = createContext<IMenuToggleContext>({
	isMenuClicked: false,
	toggleMenu: () => {},
	isMenuOptionsClicked: false,
	toggleMenuOptions: () => {},
});

export const MenuToggleProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [isMenuClicked, setIsMenuClicked] = useState<boolean>(false);
	const [isMenuOptionsClicked, setIsMenuOptionsClicked] =
		useState<boolean>(false);

	const toggleMenu = () => {
		setIsMenuClicked(prev => !prev);
		setIsMenuOptionsClicked(false);
	};

	const toggleMenuOptions = () => {
		setIsMenuOptionsClicked(prev => !prev);
		setIsMenuClicked(false);
	};

	return (
		<MenuToggleContext.Provider
			value={{
				isMenuClicked,
				toggleMenu,
				isMenuOptionsClicked,
				toggleMenuOptions,
			}}
		>
			{children}
		</MenuToggleContext.Provider>
	);
};
