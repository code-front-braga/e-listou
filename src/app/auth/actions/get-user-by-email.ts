'use server';

import { db } from '@/lib/db/prisma';

export async function getUserByEmail(email: string) {
	if (!email) {
		throw new Error('Email do usuário é inválido.');
	}

	try {
		const existingUser = await db.user.findUnique({ where: { email } });

		return existingUser || null;
	} catch (error) {
		console.error('Erro ao buscar o usuário por email:', error);
		return null;
	}
}
