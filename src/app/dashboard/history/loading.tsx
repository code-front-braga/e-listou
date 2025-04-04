import { MoonLoader } from 'react-spinners';

export default function Loading() {
	return (
		<div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
			<MoonLoader size={28} color="#d94e67" />
			<p className="text-christalle text-center">Carregando seu histórico...</p>
		</div>
	);
}
