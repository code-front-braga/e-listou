import { z } from 'zod';

const credentialsLoginSchema = z.object({
	email: z.string().min(2, { message: 'Digite seu email' }),
	password: z.string().min(6, { message: 'Digite sua senha' }),
});

type CredentialsLoginData = z.infer<typeof credentialsLoginSchema>;

export { credentialsLoginSchema, type CredentialsLoginData };
