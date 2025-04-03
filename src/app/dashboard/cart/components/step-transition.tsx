'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useContext } from 'react';
import { CartContext } from '../contexts/cart';

interface StepTransitionProps {
	children: React.ReactNode;
	shouldExit?: boolean;
	onExitComplete?: () => void;
	className?: string;
}

export function StepTransition({
	children,
	shouldExit,
	onExitComplete,
	className,
}: StepTransitionProps) {
	const { step } = useContext(CartContext);

	return (
		<AnimatePresence onExitComplete={onExitComplete}>
			{!shouldExit && (
				<motion.div
					initial={
						step !== 'init-step'
							? { opacity: 0, x: 400 }
							: { opacity: 0, x: -400 }
					}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: 400 }}
					transition={{ duration: 0.4 }}
					className={className}
				>
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	);
}
