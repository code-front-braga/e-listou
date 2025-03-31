import Link from 'next/link';

interface AuthFormFooterProps {
	paragraphText: string;
	href: string;
	linkText: string;
}

export function AuthFooter({
	paragraphText,
	href,
	linkText,
}: AuthFormFooterProps) {
	return (
		<div className="text-christalle mt-4 flex w-full items-center justify-evenly">
			<p className="text-sm">{paragraphText}</p>
			<Link href={href} className="text-sm underline underline-offset-4">
				{linkText}
			</Link>
		</div>
	);
}
