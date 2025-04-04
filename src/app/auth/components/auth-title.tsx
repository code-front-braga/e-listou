'use client';

import { FaOpencart } from 'react-icons/fa';

export function AuthTitle() {
	return (
		<div className="z-50 w-full rounded-b-3xl p-[1.6rem] md:static md:bg-transparent md:shadow-none">
			<div className="relative z-10 m-auto flex max-w-7xl flex-col items-center gap-1">
				<div className="relative flex items-center justify-center gap-2 overflow-hidden">
					<h1 className="font-poiretOne text-christalle text-2xl font-semibold sm:text-3xl">
						<span className="text-cabaret">e-</span>
						<span className="text-cabaret">L</span>istou
						<span className="text-cabaret font-lato">!</span>
					</h1>
					<div className="bg-christalle z-0 flex items-center justify-center rounded-full p-1.5">
						<FaOpencart size={24} className="text-white" />
					</div>
				</div>
				<p className="text-christalle text-base sm:text-xl">
					Seu supermercado, do seu jeito.
				</p>
			</div>
		</div>
	);
}
