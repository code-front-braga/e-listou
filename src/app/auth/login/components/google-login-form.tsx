'use client';

import Form from 'next/form';
import { useActionState } from 'react';
import { FcGoogle } from 'react-icons/fc';
// import { googleAuthenticate } from '../../actions/google-login';
import { Button } from '@/components/ui/button';

export function GoogleLoginForm() {
	// const [status, formAction] = useActionState(googleAuthenticate, undefined);

	return (
		<Form action={() => {}} className="w-full">
			<Button
				type="submit"
				className="text-christalle border-christalle/40 mt-3.5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm border-1 bg-white/60 py-2 shadow hover:bg-gray-200"
			>
				<span>Ou faça o login pelo Google</span>
				<FcGoogle size={24} />
			</Button>
			{/* {status?.success === false && <p>{status?.message}</p>} */}
		</Form>
	);
}
