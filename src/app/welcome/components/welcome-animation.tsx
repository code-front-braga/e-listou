'use client';

import { Prisma, User } from '@prisma/client';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { FaOpencart } from 'react-icons/fa';
import { updateLogin } from '../actions/update-login';
import { showPromiseToast } from '@/components/promise-toast';

interface AnimateScreenProps {
	user: Prisma.UserGetPayload<{ select: { name: true; email: true } }>;
}

const gradientVariants = {
	animate: {
		backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
		transition: {
			duration: 15,
			ease: 'linear',
			repeat: Infinity,
		},
	},
};

export function WelcomeAnimation({ user }: AnimateScreenProps) {
	const router = useRouter();

	async function handleRedirectToDashboard() {
		const resPromise = updateLogin(user.email);
		showPromiseToast({
			loading: 'Redirecionando...',
			promise: resPromise,
		});
		try {
			const res = await resPromise;
			if (res.success) {
				router.push('/dashboard');
			}
			if (res.error) {
				console.log(res.error);
			}
		} catch (error) {
			console.error('Erro ao redirecionar para o dashboard:', error);
		}
	}

	return (
		<motion.div
			variants={gradientVariants}
			animate="animate"
			style={{
				background: 'linear-gradient(90deg, #6a11cb, #2575fc)',
				backgroundSize: '200% 200%',
			}}
			className="flex h-screen items-center justify-center"
		>
			<motion.article
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease: 'easeInOut' }}
				className="flex flex-col items-center gap-4 text-center text-white"
			>
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.2 }}
					className="rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-3"
				>
					<FaOpencart size={32} />
				</motion.div>
				<motion.h1
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.4 }}
					className="text-3xl font-semibold"
				>
					Bem-vindo(a), {user.name}!
				</motion.h1>
				<motion.p
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.6 }}
					className="text-lg"
				>
					Seu supermercado, do seu jeito.
				</motion.p>
				<motion.p
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.8 }}
					className="text-lg"
				>
					Esperamos que aproveite nosso App web.
				</motion.p>

				<motion.button
					onClick={handleRedirectToDashboard}
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.6, ease: 'easeInOut', delay: 1 }}
					whileHover={{ scale: 1.05 }}
					className="border-6a11cb mt-4 rounded-lg bg-white px-4 py-2 font-semibold text-[#6a11cb]"
				>
					Ir para Dashboard
				</motion.button>
			</motion.article>
		</motion.div>
	);
}
