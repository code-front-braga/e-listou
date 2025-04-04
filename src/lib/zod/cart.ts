import { z } from 'zod';

const supermarketNameSchema = z.object({
	supermarketName: z
		.string()
		.min(2, { message: 'Campo obrigatório. Digite um nome de supermercado.' })
		.trim(),
});

type SupermarketNameData = z.infer<typeof supermarketNameSchema>;

const addNewItemSchema = z.object({
	productName: z.string().min(1, { message: 'Digite um produto' }).trim(),
	unitPrice: z.coerce
		.number()
		.min(0.01, { message: 'Digite um preço válido' })
		.refine(n => n > 0, { message: 'Deve ser maior que 0' }),

	quantity: z.coerce
		.number()
		.min(1, { message: 'Digite um número' })
		.refine(n => n > 0, { message: 'Deve ser maior que 0' }),
});

type AddNewItemData = z.infer<typeof addNewItemSchema>;

const editItemSchema = z.object({
	price: z.coerce
		.number()
		.min(0.01, { message: 'Digite um preço válido' })
		.refine(n => n > 0, { message: 'Deve ser maior que 0' }),

	quantity: z.coerce
		.number()
		.min(1, { message: 'Digite um número' })
		.refine(n => n > 0, { message: 'Deve ser maior que 0' }),
});

type EditItemData = z.infer<typeof editItemSchema>;

export {
	supermarketNameSchema,
	type SupermarketNameData,
	addNewItemSchema,
	type AddNewItemData,
	editItemSchema,
	type EditItemData,
};
