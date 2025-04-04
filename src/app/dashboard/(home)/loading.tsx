'use client';

import { TailSpin } from 'react-loader-spinner';

export default function Loading() {
	return (
		<div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
			<TailSpin visible height="40" width="40" color="#d94e67" />
			<p className="text-christalle text-center">
				Carregando suas informações...
			</p>
		</div>
	);
}
