'use client';

import { motion } from 'motion/react';
import { NavbarDesktop } from './desktop-navbar';
import { AuthOptionsDesktop } from './auth-options';

export function DesktopHeader() {
	return (
		<header className="fixed z-50 hidden h-20 w-full rounded-b-3xl md:block">
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{
					duration: 0.6,
					delay: 2.6,
					ease: 'anticipate',
					type: 'spring',
				}}
				className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-6"
			>
				<NavbarDesktop />
				<AuthOptionsDesktop />
			</motion.div>
		</header>
	);
}
