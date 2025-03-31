'use client';

import { motion } from 'motion/react';
import { TechsList } from './techs-list';

export function Content() {
	return (
		<article className="relative z-10 container mt-20 flex flex-col gap-6 px-5 py-8 md:m-auto">
			<motion.h2
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease: 'easeOut' }}
				viewport={{ once: false }}
				className="font-poiretOne text-center text-xl font-semibold text-white"
			>
				Tecnologias do <span className="text-cabaret">e-L</span>istou
				<span className="font-lato text-cabaret">!</span>
			</motion.h2>

			<TechsList />
		</article>
	);
}
