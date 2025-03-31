'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { Features } from './features';

export function Content() {
	return (
		<div className="mt-15 flex w-full max-w-7xl flex-col items-center justify-center gap-4 px-5 md:m-auto md:flex-row">
			<article className="flex flex-col gap-4">
				<div className="flex flex-1 flex-col gap-1.5">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 1.2, ease: 'easeOut' }}
						viewport={{ once: false }}
						className="font-poiretOne mt-10 text-xl leading-snug font-semibold text-white sm:text-2xl"
					>
						O que é o <span className="text-christalle">e-L</span>istou
						<span className="text-christalle font-lato">!</span>
					</motion.h2>

					<motion.p
						className="font-gantari text-justify text-sm leading-normal text-white sm:text-base"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 1.4, ease: 'easeOut', delay: 0.2 }}
						viewport={{ once: false }}
					>
						O e-Listou! é uma plataforma desenvolvida para otimizar sua
						experiência de compras. Com funcionalidades intuitivas, ele permite
						que você organize suas listas, acompanhe seus gastos e tenha um
						melhor planejamento financeiro. Nosso objetivo é oferecer uma
						solução prática e eficiente para transformar a maneira como você faz
						suas compras.
					</motion.p>
				</div>

				<div className="flex flex-col gap-4">
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 1.4, ease: 'easeOut', delay: 0.4 }}
						viewport={{ once: false }}
						className="text-christalle font-gantari"
					>
						Com uma interface simples e intuitiva, o e-Listou! permite que você:
					</motion.p>

					<Features />

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, ease: 'easeOut', delay: 0.6 }}
						viewport={{ once: false }}
						className="font-rajdhani text-christalle leading-normal font-semibold sm:text-lg"
					>
						Nosso compromisso é oferecer uma experiência prática e eficiente
						para que você tenha mais controle sobre suas compras e gastos.
					</motion.p>
				</div>
			</article>

			<motion.div
				initial={{ opacity: 0, x: 20 }}
				whileInView={{ opacity: 1, x: 0 }}
				transition={{ duration: 1, ease: 'anticipate', delay: 0.6 }}
				className="bg-christalle relative mb-4 h-50 w-full rounded-xl md:mb-0 md:block md:h-100 md:flex-3/2"
			>
				<Image
					src="/bg-about.jpg"
					alt="Homem negro segurando uma fruta e um celular comparando preços"
					fill
					quality={100}
					priority
					className="rounded-xl object-cover opacity-55"
				/>
			</motion.div>
		</div>
	);
}
