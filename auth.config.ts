import { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
// import Credentials from 'next-auth/providers/credentials';

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
	],
} satisfies NextAuthConfig;
