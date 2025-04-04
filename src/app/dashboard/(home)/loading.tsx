import { ImSpinner } from 'react-icons/im';

export default function Loading() {
	return (
		<div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
			<ImSpinner size={30} className="text-cabaret animate-spin" />
			<p className="text-christalle text-center">
				Carregando suas informações...
			</p>
		</div>
	);
}
