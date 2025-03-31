'use client';

import Link from 'next/link';

export function AuthOptionsDesktop() {
	return (
		<div className="bg-christalle flex items-center justify-center gap-3 rounded-lg p-2 px-4 text-white">
			<Link href="/auth/login">Entrar</Link>
			<Link href="/auth/register">Cadastre-se</Link>
		</div>
	);
}
