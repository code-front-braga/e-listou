import { db } from '@/lib/db/prisma';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import authConfig from './auth.config';
import { getUserById } from '@/services/user';

export const {
	handlers: { GET, POST },
	signIn,
	signOut,
	auth,
} = NextAuth({
	adapter: PrismaAdapter(db),
	session: { strategy: 'jwt' },
	...authConfig,
	callbacks: {
		async signIn({ user, account }) {
			if (account?.provider !== 'credendials') return true;

			const existingUser = await getUserById(user.id ?? '');
			if (!existingUser) return false;

			return true;
		},
	},
});
