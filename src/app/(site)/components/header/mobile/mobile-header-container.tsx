'use client';

export function MobileHeaderContainer({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4">
			{children}
		</div>
	);
}
