'use client';

import { motion } from 'motion/react';
import { BsChevronBarDown } from 'react-icons/bs';
import { FaOpencart } from 'react-icons/fa';
import Navbar from './mobile-navbar';
import { MenuToggleContext } from '@/app/(site)/contexts/menu-toggle-context';
import { useContext } from 'react';

export function MenuButton() {
	const { isMenuClicked, toggleMenu } = useContext(MenuToggleContext);
	return (
		<div className="relative">
			<button
				className="relative flex items-center rounded-3xl"
				onClick={toggleMenu}
			>
				<div className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[6px_0_6px_#00000055]">
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: isMenuClicked ? 1 : 0 }}
						transition={{ duration: 0.8, ease: 'anticipate' }}
						className="absolute"
					>
						<BsChevronBarDown size={18} color="#3e2259" />
					</motion.div>
					<motion.div
						animate={{
							x: isMenuClicked ? 40 : 0,
							color: isMenuClicked ? '#ffffff' : '#3e2259',
						}}
						transition={{ duration: 0.8, ease: 'anticipate' }}
					>
						<FaOpencart size={22} />
					</motion.div>
				</div>
			</button>
			{isMenuClicked && <Navbar />}
		</div>
	);
}
