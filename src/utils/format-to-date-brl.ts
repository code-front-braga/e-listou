export function formatToDateBRL(value: Date | null): string {
	if (!value) {
		return '';
	}

	return value.toLocaleDateString('pt-br', { dateStyle: 'medium' });
}
