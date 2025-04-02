import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';

export function InitStep() {
	return (
		<div className="flex h-full">
			<Link href="" className="flex items-center gap-2 self-end">
				<FaPlus size={20} color="#f25c05" />
				<span className="text-christalle font-semibold">
					Nova Lista de Compras
				</span>
			</Link>
		</div>
	);
}
