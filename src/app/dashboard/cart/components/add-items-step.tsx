import { AddItemForm } from './add-item-form';
import { AddItemsHeader } from './add-items-header';
import { ItemsList } from './items-list';

export function AddItemsStep() {
	return (
		<>
			<AddItemsHeader />
			<ItemsList />
			<AddItemForm />
		</>
	);
}
