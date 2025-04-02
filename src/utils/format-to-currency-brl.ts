export function formatToCurrencyBRL(value: number | string) {
	if (!value) return '';

	const numericValue = Number(value);
	if (isNaN(numericValue)) return '';

	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	}).format(numericValue);
}
