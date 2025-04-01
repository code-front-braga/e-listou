import { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { credentialsLoginSchema } from '@/lib/zod/auth';
import { db } from '@/lib/db/prisma';
import { compare } from 'bcrypt-ts';

export default {
	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code',
				},
			},
		}),
		Credentials({
			async authorize(credentials) {
				const validatedData = credentialsLoginSchema.safeParse(credentials);
				if (!validatedData.success) return null;

				const { email, password } = validatedData.data;
				const existingUser = await db.user.findFirst({ where: { email } });
				if (!existingUser || !existingUser.email || !existingUser.password)
					return null;

				const passwordsMatch = await compare(password, existingUser.password);
				if (passwordsMatch) return existingUser;

				return null;
			},
		}),
	],
} satisfies NextAuthConfig;
