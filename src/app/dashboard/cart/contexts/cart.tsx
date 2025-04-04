'use client';

import { SupermarketNameData } from '@/lib/zod/cart';
import { calculateTotal } from '@/utils/calculate-total';
import { multiplyNumbers } from '@/utils/mutiply-numbers';
import { Item } from '@prisma/client';
import { createContext, useEffect, useState } from 'react';
import { getPendingCart } from '../../actions/get-pending-cart';
import { getItems } from '../../actions/get-items';

type CartSteps = 'init-step' | 'supermarket-step' | 'add-items-step';

interface ICartContext {
	step: CartSteps;
	setStep: (step: CartSteps) => void;

	nextStep: () => void;
	backStep: () => void;

	supermarketName: string;
	setSupermarketName: (name: string) => void;
	handleSupermarketName: (supermarketName: SupermarketNameData) => void;

	openAddItemForm: () => void;
	closeAddItemForm: () => void;
	addItemFormOpen: boolean;
	addItemFormSubmitted: boolean;

	items: Item[];
	addNewItemContext: (item: Item) => void;
	deleteItemContext: (item: Item) => void;
	editItemContext: (item: Item) => void;
	completeCartContext: () => void;
	total: number;
	setTotal: (total: number) => void;

	deleteItemFormOpen: boolean;
	openDeleteItemForm: () => void;
	closeDeleteItemForm: () => void;

	pendingCart: { supermarketName: string; id: string } | null;
	pendingLoading: boolean;
	setPendingLoading: (pendingLoading: boolean) => void;
}

export const CartContext = createContext<ICartContext>({
	step: 'init-step',
	setStep: () => {},

	nextStep: () => {},
	backStep: () => {},

	supermarketName: '',
	setSupermarketName: () => {},
	handleSupermarketName: () => {},

	openAddItemForm: () => {},
	closeAddItemForm: () => {},
	addItemFormOpen: false,
	addItemFormSubmitted: false,

	items: [],
	addNewItemContext: () => {},
	deleteItemContext: () => {},
	editItemContext: () => {},
	completeCartContext: () => {},
	total: 0,
	setTotal: () => {},

	deleteItemFormOpen: false,
	openDeleteItemForm: () => {},
	closeDeleteItemForm: () => {},

	pendingCart: null,
	pendingLoading: false,
	setPendingLoading: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
	const [step, setStep] = useState<CartSteps>('init-step');
	const [supermarketName, setSupermarketName] = useState<string>('');
	const [addItemFormOpen, setAddItemFormOpen] = useState<boolean>(false);
	const [addItemFormSubmitted, setAddItemFormSubmitted] =
		useState<boolean>(false);
	const [items, setItems] = useState<Item[]>([]);
	const [total, setTotal] = useState<number>(0);
	const [deleteItemFormOpen, setDeleteItemFormOpen] = useState<boolean>(false);
	const [pendingCart, setPendingCart] = useState<{
		supermarketName: string;
		id: string;
	} | null>(null);
	const [pendingLoading, setPendingLoading] = useState<boolean>(false);

	useEffect(() => {
		async function loadCartData() {
			setPendingLoading(true);

			try {
				const cart = await getPendingCart();
				if (cart) {
					setPendingCart({ id: cart.id, supermarketName: cart.supermarket });

					const cartItems = await getItems({ cartId: cart.id });

					setItems(cartItems);
					setTotal(calculateTotal(cartItems));
				}
			} catch (error) {
				console.error('Erro ao buscar o carrinho:', error);
			} finally {
				setPendingLoading(false);
			}
		}
		loadCartData();
	}, []);

	function nextStep() {
		switch (step) {
			case 'init-step':
				setStep('supermarket-step');
				break;
			case 'supermarket-step':
				setStep('add-items-step');
				break;
			default:
				break;
		}
	}

	function backStep() {
		switch (step) {
			case 'add-items-step':
				setStep('supermarket-step');
				break;

			case 'supermarket-step':
				setStep('init-step');
				break;
			default:
				break;
		}
	}

	function handleSupermarketName(data: SupermarketNameData) {
		setSupermarketName(data.supermarketName);
	}

	const openAddItemForm = () => setAddItemFormOpen(true);
	const closeAddItemForm = () => setAddItemFormOpen(false);

	const openDeleteItemForm = () => setDeleteItemFormOpen(true);
	const closeDeleteItemForm = () => setDeleteItemFormOpen(false);

	function addNewItemContext(item: Item) {
		setItems(prevItems => [...prevItems, item]);
		setAddItemFormSubmitted(true);

		setTotal(
			prevTotal => prevTotal + multiplyNumbers(item.price, item.quantity),
		);
	}

	function deleteItemContext(item: Item) {
		setItems(prevItems => {
			const updatedItems = prevItems.filter(
				prevItem => prevItem.id !== item.id,
			);

			const newTotal = calculateTotal(updatedItems);
			setTotal(newTotal);

			return updatedItems;
		});
	}

	function editItemContext(updatedItem: Item) {
		setItems(prevItems => {
			const updatedItems = prevItems.map(prevItem => {
				if (prevItem.id === updatedItem.id) {
					return updatedItem;
				}
				return prevItem;
			});
			const newTotal = calculateTotal(updatedItems);
			setTotal(newTotal);

			return updatedItems;
		});
	}

	function completeCartContext() {
		setSupermarketName('');
		setItems([]);
		setPendingCart(null);
		setTotal(0);
		setAddItemFormSubmitted(false);
		setAddItemFormOpen(false);
	}

	return (
		<CartContext.Provider
			value={{
				step,
				setStep,
				nextStep,
				backStep,
				supermarketName,
				setSupermarketName,
				handleSupermarketName,
				openAddItemForm,
				closeAddItemForm,
				addItemFormOpen,
				addItemFormSubmitted,
				items,
				addNewItemContext,
				deleteItemContext,
				editItemContext,
				completeCartContext,
				total,
				setTotal,
				deleteItemFormOpen,
				openDeleteItemForm,
				closeDeleteItemForm,
				pendingCart,
				pendingLoading,
				setPendingLoading,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
