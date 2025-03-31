'use client';

import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { FaUserPlus } from 'react-icons/fa';
import { IoLogInSharp } from 'react-icons/io5';

export function AuthOptions() {
	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.6, ease: 'anticipate', type: 'spring' }}
				className="absolute top-10 right-0 flex w-40 flex-col items-end gap-2 rounded-sm bg-white/70 px-3 py-1.5 shadow-xl backdrop-blur-lg"
			>
				<div className="flex w-full items-center justify-between">
					<IoLogInSharp size={20} className="text-christalle" />
					<Link
						href="/auth/login"
						className="text-christalle text-sm font-semibold"
					>
						log in
					</Link>
				</div>
				<div className="flex w-full items-center justify-between">
					<FaUserPlus size={20} className="text-christalle" />
					<Link
						href="/auth/register"
						className="text-christalle text-sm font-semibold"
					>
						crie sua conta
					</Link>
				</div>
			</motion.div>
		</AnimatePresence>
	);
}
