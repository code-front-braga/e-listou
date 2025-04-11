'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import { useContext } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import { RegisterContext } from '../context/register-context';
import { BeatLoader } from 'react-spinners';

interface SubmitStepProps {
	loading: boolean;
}

export function SubmitStep({ loading }: SubmitStepProps) {
	const { backStep } = useContext(RegisterContext);

	return (
		<motion.div
			key="finishStep"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.3 }}
			className="flex h-58 w-full flex-col justify-around gap-2"
		>
			<div className="flex justify-between gap-2">
				<h3 className="text-christalle text-sm font-semibold">
					Quase lá... Para finalizar, basta clicar no botão abaixo!
				</h3>

				<button onClick={backStep} className="flex items-center gap-1.5">
					<motion.div
						animate={{ x: -4 }}
						transition={{
							duration: 0.6,
							repeat: Infinity,
							repeatType: 'reverse',
						}}
					>
						<MdKeyboardDoubleArrowLeft
							size={26}
							className="text-cabaret flex"
						/>
					</motion.div>
					<span className="text-christalle font-semibold">Voltar</span>
				</button>
			</div>
			<Button
				type="submit"
				className="bg-cabaret mt-3 flex w-full items-center justify-between rounded px-4 py-2 text-white"
			>
				{loading ? (
					<>
						<span>Criando Sua Conta...</span>
						<BeatLoader size={8} color="#fff" />
					</>
				) : (
					<>
						<span>Criar Conta</span>
						<motion.div
							initial={{ scale: 1 }}
							animate={{ scale: 1.3 }}
							transition={{
								duration: 0.6,
								repeat: Infinity,
								repeatType: 'reverse',
							}}
						>
							<FaUserPlus size={24} />
						</motion.div>
					</>
				)}
			</Button>
		</motion.div>
	);
}
