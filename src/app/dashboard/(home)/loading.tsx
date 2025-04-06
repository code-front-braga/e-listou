'use client';

import { MoonLoader } from 'react-spinners';

export default function Loading() {
	return (
		<div className="flex h-[calc(100vh-168px)] items-center justify-center">
			<div className="flex flex-col items-center gap-4">
				<MoonLoader size={28} color="#d94e67" />
				<p className="text-christalle text-center">
					Carregando suas informações...
				</p>
			</div>
		</div>
	);
}
