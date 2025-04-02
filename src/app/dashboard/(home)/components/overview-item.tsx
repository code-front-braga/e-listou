interface OverviewItemProps {
	title: string;
	description: string;
	children: Readonly<React.ReactNode>;
}

export function OverviewItem({
	title,
	description,
	children,
}: OverviewItemProps) {
	return (
		<div className="bg-moonRaker flex items-center justify-between rounded p-2.5 px-3.5">
			<div className="text-christalle">
				<p className="text-sm">{title}:</p>
				<p className="font-medium">{description}</p>
			</div>
			{children}
		</div>
	);
}
