'use client';

import { useForm, UseFormReturn } from 'react-hook-form';
import { RegisterData } from '@/lib/zod/auth';
import { useContext } from 'react';
import { RegisterContext } from '../context/register-context';
import { motion } from 'motion/react';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import { BackButton } from './back-button';

interface StepProps {
	title: string;
	label: string;
	ariaLabel?: string;
	fieldName: keyof RegisterData;
	placeholder: string;
	onNext: (e: React.FormEvent) => void;
	form: UseFormReturn<RegisterData>;
	type?: string;
	autoComplete?: string;
	showPassword?: boolean;
	setShowPassword?: (showPassword: boolean) => void;
}

export function InputStepModel({
	title,
	label,
	ariaLabel,
	fieldName,
	placeholder,
	onNext,
	form,
	type,
	autoComplete,
	showPassword,
	setShowPassword,
}: StepProps) {
	const { step } = useContext(RegisterContext);

	return (
		<motion.div
			key={fieldName.toString()}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}
			className="flex h-58 w-full flex-col justify-around gap-2"
		>
			<div className="flex items-center justify-between gap-2">
				<h3 className="text-christalle text-sm font-semibold">{title}</h3>
				<BackButton />
			</div>
			<FormField
				control={form.control}
				name={fieldName}
				render={({ field }) => (
					<FormItem className="relative w-full">
						<FormLabel className="text-christalle">{label}</FormLabel>
						<FormControl>
							<Input
								type={showPassword ? 'text' : type}
								placeholder={placeholder}
								aria-label={ariaLabel}
								{...field}
								autoComplete={autoComplete}
								className="bg-christalle/65 rounded p-2 indent-2 text-sm text-white placeholder:text-white"
								onKeyDown={e => {
									if (e.key === 'Enter') {
										e.preventDefault();
									}
								}}
							/>
						</FormControl>
						{(step === 'password-step' || step === 'confirm-password-step') && (
							<button
								className="text-christalle absolute top-7.5 right-3.5"
								type="button"
								onClick={() => setShowPassword && setShowPassword(true)}
							>
								{showPassword ? (
									<IoIosEye size={18} />
								) : (
									<IoIosEyeOff size={18} />
								)}
							</button>
						)}
						<FormMessage className="text-xs font-semibold" />
					</FormItem>
				)}
			/>
			<button
				type="button"
				onClick={e => onNext(e)}
				className="bg-cabaret mt-3 flex w-full items-center justify-between rounded px-4 py-2 text-sm text-white"
			>
				<span>Avançar</span>
				<motion.div
					animate={{ x: 8 }}
					transition={{
						duration: 0.6,
						repeat: Infinity,
						repeatType: 'reverse',
					}}
				>
					<MdOutlineKeyboardDoubleArrowRight size={24} />
				</motion.div>
			</button>
		</motion.div>
	);
}
