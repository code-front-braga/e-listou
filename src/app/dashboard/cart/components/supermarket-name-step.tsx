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
import { motion } from 'motion/react';
import { useContext, useState } from 'react';
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import { CartContext } from '../contexts/cart';
import { useForm } from 'react-hook-form';
import { SupermarketNameData, supermarketNameSchema } from '@/lib/zod/cart';
import { zodResolver } from '@hookform/resolvers/zod';
import { StepTransition } from './step-transition';
import { createCart } from '../../actions/create-cart';
import { showPromiseToast } from '@/components/promise-toast';

export function SupermarketNameStep() {
	const form = useForm<SupermarketNameData>({
		resolver: zodResolver(supermarketNameSchema),
		defaultValues: { supermarketName: '' },
	});
	const { nextStep, backStep, handleSupermarketName } = useContext(CartContext);
	const [loading, setLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [shouldExit, setShouldExit] = useState<boolean>(false);

	const handleBackStep = () => setShouldExit(true);

	async function handleCreateCart(data: SupermarketNameData) {
		setLoading(true);
		setErrorMessage(null);

		const resPromise = createCart({ ...data });
		showPromiseToast({
			loading: 'Criando carrinho...',
			promise: resPromise,
		});

		try {
			const res = await resPromise;
			if (res.success) {
				handleSupermarketName(data);
				nextStep();
				form.reset();
			} else if (res.error) {
				setErrorMessage(res.error);
			}
		} catch (error) {
			console.error('Erro ao tentar salvar o carrinho:', error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<>
			<StepTransition
				onExitComplete={backStep}
				shouldExit={shouldExit}
				className="flex h-full flex-col"
			>
				<button
					onClick={handleBackStep}
					className="mb-4 flex items-center gap-1.5"
				>
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
					supermercado onde você fará suas compras hoje e depois clique em
					<span className="text-persimmon font-bold">&quot;Começar&quot;</span>.
				</p>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleCreateCart)}
						className="flex h-full flex-col justify-between"
					>
						{errorMessage && <p className="text-cabaret">{errorMessage}</p>}
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
