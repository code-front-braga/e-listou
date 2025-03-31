'use client';

import { IconType } from 'react-icons';
import { FaReact } from 'react-icons/fa';
import {
	SiAuthelia,
	SiNextdotjs,
	SiPostgresql,
	SiPrisma,
	SiTailwindcss,
} from 'react-icons/si';
import { motion } from 'motion/react';

interface TechsProps {
	name: string;
	icon: IconType;
	description: string;
}

const techs: TechsProps[] = [
	{
		name: 'Next.js 15',
		icon: SiNextdotjs,
		description:
			'Framework moderno para criar aplicações rápidas e escaláveis.',
	},
	{
		name: 'React',
		icon: FaReact,
		description:
			'Biblioteca para construção de interfaces dinâmicas e eficientes.',
	},
	{
		name: 'Tailwind CSS',
		icon: SiTailwindcss,
		description:
			'Framework CSS para um design responsivo e estilização otimizada.',
	},
	{
		name: 'Prisma',
		icon: SiPrisma,
		description:
			'ORM moderno para gerenciar o banco de dados de forma eficiente.',
	},
	{
		name: 'PostgreSQL',
		icon: SiPostgresql,
		description:
			'Banco de dados relacional robusto e confiável para armazenar os dados.',
	},
	{
		name: 'NextAuth',
		icon: SiAuthelia,
		description: 'Sistema seguro de autenticação via Google para login rápido.',
	},
];

const techColors: Record<string, string> = {
	React: 'text-blue-500',
	'Next.js 15': 'text-white',
	'Tailwind CSS': 'text-blue-600',
	Prisma: 'text-white',
	PostgreSQL: 'text-cyan-600',
	NextAuth: 'text-white',
};

export function TechsList() {
	const techList = techs.map((tech, index) => {
		return (
			<motion.div
				key={tech.name}
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{
					duration: 0.4,
					ease: 'anticipate',
					delay: index * 0.1,
				}}
				viewport={{ once: false }}
				className="flex flex-col items-center rounded-lg bg-christalle/60 p-4 text-center text-white shadow-md backdrop-blur-sm transition-transform duration-300 hover:scale-102"
			>
				<div className="mb-2">
					<tech.icon size={24} className={techColors[tech.name]} />
				</div>
				<h3 className="text-base font-semibold">{tech.name}</h3>
				<p className="text-sm opacity-80">{tech.description}</p>
			</motion.div>
		);
	});

	return (
		<motion.div
			className="grid grid-cols-1 gap-4 md:grid-cols-3"
			initial="hidden"
			whileInView="visible"
			variants={{
				hidden: { opacity: 0 },
				visible: {
					opacity: 1,
					transition: { staggerChildren: 0.22 },
				},
			}}
			viewport={{ once: true }}
		>
			{techList}
		</motion.div>
	);
}
