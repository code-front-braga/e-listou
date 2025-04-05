'use client';

import { RiArrowDownDoubleLine } from 'react-icons/ri';
import { motion } from 'motion/react';
import { CheckCircle } from 'lucide-react';
import { Prisma } from '@prisma/client';

interface WelcomeScreenProps {
	user: Prisma.UserGetPayload<{ select: { name: true } }>;
}

export function WelcomeScreen({ user }: WelcomeScreenProps) {
	return (
		<div className="flex h-[calc(100vh-168px)] flex-col items-center justify-between p-4 text-center">
			<div className="m-auto flex flex-col gap-4">
				<h2 className="text-cabaret text-xl font-semibold">
					E aí, <span className="text-christalle">{user.name}</span>! 👋
				</h2>
				<p className="text-christalle text-lg">
					Tudo certo? Parece que você ainda não tem informações de compra para
					exibir.
				</p>
				<p className="text-christalle/80">
					Faça sua primeira compra para desbloquear estatísticas como:
				</p>
				<ul className="text-christalle m-auto mt-2 list-none font-semibold">
					<li className="mb-1 flex items-center gap-2">
						<CheckCircle className="text-cabaret h-5 w-5" />{' '}
						<span>Supermercado Favorito</span>
					</li>
					<li className="mb-1 flex items-center gap-2">
						<CheckCircle className="text-cabaret h-5 w-5" />
						<span>Compra de Maior Valor</span>
					</li>
					<li className="flex items-center gap-2">
						<CheckCircle className="text-cabaret h-5 w-5" />
						<span>Total Geral em Compras</span>
					</li>
				</ul>
				<p className="text-christalle font-semibold">E muito mais!</p>
			</div>
			<motion.div
				animate={{ y: -8 }}
				transition={{
					duration: 0.3,
					repeat: Infinity,
					repeatType: 'reverse',
				}}
			>
				<RiArrowDownDoubleLine size={32} color="#d94e67" />
			</motion.div>
		</div>
	);
}
