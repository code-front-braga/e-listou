'use client';

import { motion } from 'motion/react';
import { FaOpencart } from 'react-icons/fa';

export function AuthTitle() {
	return (
		<div className="z-50 w-full rounded-b-3xl p-[1.6rem] md:static md:bg-transparent md:shadow-none">
			<div className="relative z-10 m-auto flex max-w-7xl flex-col items-center gap-1">
				<div className="relative flex items-center justify-center gap-2 overflow-hidden">
					<motion.h1
						initial={{ x: 50, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ duration: 1.4, ease: 'easeOut', delay: 1.2 }}
						className="font-poiretOne text-christalle text-3xl font-semibold sm:text-4xl"
					>
						<span className="text-cabaret">e-</span>
						<span className="text-cabaret">L</span>istou
						<motion.span
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 1.4, ease: 'linear', delay: 2.6 }}
							className="text-cabaret font-lato"
						>
							!
						</motion.span>
					</motion.h1>
					<motion.div
						initial={{ x: -50 }}
						animate={{ x: 0 }}
						transition={{ duration: 2.2, ease: 'anticipate', delay: 0.6 }}
						className="z-0 flex items-center justify-center rounded-full bg-white p-1.5"
					>
						<FaOpencart size={24} className="text-christalle" />
					</motion.div>
				</div>
				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1, ease: 'linear', delay: 1.6 }}
					className="text-christalle text-lg sm:text-xl"
				>
					Seu supermercado, do seu jeito.
				</motion.p>
			</div>
		</div>
	);
}
