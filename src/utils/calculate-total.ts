import { multiplyNumbers } from './mutiply-numbers';

interface Item {
	price: number;
	quantity: number;
}

export function calculateTotal(arr: Item[]): number {
	return arr.reduce(
		(acc, currentValue) =>
			acc + multiplyNumbers(currentValue.price, currentValue.quantity),
		0,
	);
}
