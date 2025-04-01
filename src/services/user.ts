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
