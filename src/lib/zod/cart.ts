import { z } from 'zod';

const supermarketNameSchema = z.object({
	supermarketName: z
		.string()
		.min(2, { message: 'Campo obrigatório. Digite um nome de supermercado.' })
		.trim(),
});

type SupermarketNameData = z.infer<typeof supermarketNameSchema>;

export { supermarketNameSchema, type SupermarketNameData };
