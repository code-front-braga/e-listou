'use client';

import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogCancel,
	AlertDialogAction,
	AlertDialogHeader,
	AlertDialogFooter,
} from '@/components/ui/alert-dialog';

interface ConfirmDialogProps {
	title: string;
	description: string;
	handleFunction: () => void;
	isCancelDialogOpen?: boolean;
	setIsCancelDialogOpen: (isCancelDialogOpen: boolean) => void;
}

export function ConfirmDialog({
	title,
	description,
	handleFunction,
	isCancelDialogOpen,
	setIsCancelDialogOpen,
}: ConfirmDialogProps) {
	return (
		<AlertDialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="text-cabaret">{title}</AlertDialogTitle>
					<AlertDialogDescription className="text-christalle">
						{description}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={() => setIsCancelDialogOpen(false)}>
						Cancelar
					</AlertDialogCancel>
					<AlertDialogAction onClick={handleFunction}>
						Continuar
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
