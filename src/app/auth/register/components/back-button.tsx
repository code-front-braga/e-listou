import { useContext } from 'react';
import { RegisterContext } from '../context/register-context';
import { motion } from 'motion/react';
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';

export function BackButton() {
	const { step, backStep } = useContext(RegisterContext);

	return (
		<>
			{step !== 'name-step' && (
				<button onClick={backStep} className="flex items-center gap-1.5">
					<motion.div
						animate={{ x: -4 }}
						transition={{
							duration: 0.6,
							repeat: Infinity,
							repeatType: 'reverse',
						}}
					>
						<MdKeyboardDoubleArrowLeft size={24} className="text-cabaret" />
					</motion.div>
					<span className="text-christalle text-sm font-semibold">Voltar</span>
				</button>
			)}
		</>
	);
}
