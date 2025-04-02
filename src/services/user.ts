// 'use server';

import { db } from '@/lib/db/prisma';

export async function getUserById(id: string) {
	if (!id) {
		throw new Error('ID do usuário é inválido.');
	}

	try {
		const existingUser = await db.user.findUnique({
			where: { id },
		});

		return existingUser || null;
	} catch (error) {
		console.error('Erro ao buscar o usuário:', error);
		throw new Error('Ocorreu um erro ao buscar o usuário.');
	}
}

export async function getAccountByUser(userId: string) {
	if (!userId) {
		throw new Error('ID do usuário é inválido.');
	}

	try {
		const existingAccount = await db.account.findFirst({
			where: { userId },
		});

		return existingAccount || null;
	} catch (error) {
		console.error('Erro ao buscar a conta:', error);
		throw new Error('Ocorreu um erro ao buscar a conta.');
	}
}

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
