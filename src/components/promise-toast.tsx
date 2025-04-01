import { toast } from 'sonner';

interface RegisterResponse {
	success?: string;
	error?: string;
}

interface ShowPromiseToastProps<T> {
	promise: Promise<RegisterResponse>;
	loading: string;
}

export function showPromiseToast<T>({
	promise,
	loading,
}: ShowPromiseToastProps<T>) {
	return toast.promise(promise, {
		loading: loading,
		success: data => {
			if (data.success) {
				return data.success;
			} else {
				throw new Error(data.error);
			}
		},
		error: (error: Error) => {
			return error.message;
		},
		position: 'top-center',
		duration: 2500,
	});
}
