import { z } from 'zod';

const credentialsLoginSchema = z.object({
	email: z.string().min(2, { message: 'Digite seu email' }),
	password: z.string().min(6, { message: 'Digite sua senha' }),
});

type CredentialsLoginData = z.infer<typeof credentialsLoginSchema>;

const registerSchema = z
	.object({
		name: z.string().min(1, { message: 'Campo obrigatório' }).trim(),
		email: z.string().email({ message: 'Formato de email inválido' }).trim(),
		password: z
			.string()
			.trim()
			.min(6, { message: 'Sua senha deve conter, pelo menos, 6 caracteres' })
			.regex(/[A-Z]/, { message: 'Deve conter uma letra maiúscula' })
			.regex(/[a-z]/, { message: 'Deve conter uma letra minúscula' })
			.regex(/\d/, { message: 'Deve conter um número' })
			.regex(/[^A-Za-z0-9]/, { message: 'Deve conter um caracter especial' }),
		confirmPassword: z.string().trim(),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'As senhas não coincidem',
		path: ['confirmPassword'],
	});

type RegisterData = z.infer<typeof registerSchema>;

export {
	credentialsLoginSchema,
	type CredentialsLoginData,
	registerSchema,
	type RegisterData,
};
