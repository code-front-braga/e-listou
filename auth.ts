import { db } from '@/lib/db/prisma';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import authConfig from './auth.config';
import { getAccountByUser, getUserById } from '@/services/user';

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
			if (account?.provider !== 'credentials') return true;

			const existingUser = await getUserById(user.id ?? '');
			if (!existingUser) return false;

			return true;
		},

		async jwt({ token }) {
			if (!token.sub) return token;

			const existingUser = await getUserById(token.sub);
			if (!existingUser) return token;

			const existingAccount = await getAccountByUser(existingUser.id);

			token.name = existingUser.name;
			token.email = existingUser.email;
			token.image = existingUser.image;
			token.isOauth = !!existingAccount;

			return token;
		},

		async session({ session, token }) {
			return {
				...session,
				user: {
					...session.user,
					id: token.sub,
					isOauth: token.isOauth,
				},
			};
		},
	},
});
