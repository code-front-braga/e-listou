import { z } from 'zod';

const supermarketSchema = z.object({
	supermarketName: z
		.string()
		.min(2, { message: 'Campo obrigatório. Digite um nome de supermercado.' })
		.trim(),
});

type SupermarketData = z.infer<typeof supermarketSchema>;

export { supermarketSchema, type SupermarketData };
