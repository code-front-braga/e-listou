'use client';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AnimatePresence, motion } from 'motion/react';
import { useContext, useState } from 'react';
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import { CartContext } from '../contexts/cart';
import { useForm } from 'react-hook-form';
import { SupermarketData, supermarketSchema } from '@/lib/zod/cart';
import { zodResolver } from '@hookform/resolvers/zod';
import { StepTransition } from './step-transition';

export function SupermarketStep() {
	const form = useForm<SupermarketData>({
		resolver: zodResolver(supermarketSchema),
		defaultValues: { supermarketName: '' },
	});
	const { nextStep, backStep } = useContext(CartContext);
	const [loading, setLoading] = useState<boolean>(false);
	const [shouldExit, setShouldExit] = useState<boolean>(false);

	const handleBack = () => {
		setShouldExit(true);
	};

	return (
		<>
			<StepTransition
				onExitComplete={backStep}
				shouldExit={shouldExit}
				className="flex h-full flex-col"
			>
				<button onClick={handleBack} className="mb-4 flex items-center gap-1.5">
					<motion.div
						animate={{ x: -4 }}
						transition={{
							duration: 0.6,
							repeat: Infinity,
							repeatType: 'reverse',
						}}
					>
						<MdKeyboardDoubleArrowLeft size={26} className="text-cabaret" />
					</motion.div>
					<span className="text-christalle font-semibold">Voltar</span>
				</button>

				<p className="text-christalle mb-4 text-justify text-base font-semibold">
					Olá! Antes de criar sua lista, por favor, informe o nome do
					supermercado onde você fará suas compras hoje e depois clique em{' '}
					<span className="text-persimmon font-bold">"Começar"</span>.
				</p>

				<Form {...form}>
					<form className="flex h-full flex-col justify-between">
						<FormField
							control={form.control}
							name="supermarketName"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-christalle">
										Supermercado
									</FormLabel>
									<FormControl>
										<Input
											placeholder="Digite o nome do supermercado..."
											{...field}
											className="font-gantari bg-christalle/25 text-christalle rounded p-2 indent-2 text-sm placeholder:text-white"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							className="bg-persimmon hover:bg-persimmon-dark rounded px-4 py-2 font-semibold text-white transition-colors"
						>
							{loading ? 'Criando carrinho...' : 'Começar'}
						</Button>
					</form>
				</Form>
			</StepTransition>
		</>
	);
}
