export function AuthContainer({
	children,
}: {
	children: Readonly<React.ReactNode>;
}) {
	return (
		<div className="flex w-[75%] max-w-lg flex-col items-center gap-2.5 overflow-hidden rounded-2xl p-2.5 md:mt-0">
			{children}
		</div>
	);
}
