'use client';

import { motion } from 'motion/react';

const features = [
	'Crie e gerencie suas listas de compras facilmente.',
	'Registre os itens comprados e acompanhe seus gastos ao longo do tempo.',
	'Acesse seu histórico para otimizar suas compras futuras.',
	'Organize suas compras por supermercado para economizar tempo e dinheiro.',
];

export function Features() {
	const featuresList = features.map((feature, index) => {
		return (
			<motion.li
				key={index}
				className="font-gantari text-christalle flex items-center rounded-sm bg-white p-1.5 text-xs transition-transform duration-300 hover:scale-102 sm:text-sm"
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{
					duration: 0.8,
					ease: 'anticipate',
					delay: index * 0.1,
				}}
				viewport={{ once: false }}
			>
				{feature}
			</motion.li>
		);
	});

	return (
		<ul className="grid grid-cols-2 flex-wrap gap-2.5 md:grid-cols-1">
			{featuresList}
		</ul>
	);
}
