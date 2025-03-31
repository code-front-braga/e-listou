export function AuthSection({
	children,
}: {
	children: Readonly<React.ReactNode>;
}) {
	return (
		<section className="relative flex h-full w-full flex-col items-center justify-between gap-6 overflow-hidden">
			{children}
		</section>
	);
}
