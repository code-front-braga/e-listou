interface OverviewItemProps {
	title: string;
	description: string;
	children: React.ReactNode;
}

export function OverviewItem({
	title,
	description,
	children,
}: OverviewItemProps) {
	return (
		<div className="bg-moonRaker flex items-center justify-between rounded p-2.5 px-3.5">
			<div className="text-christalle">
				<p className="text-xs">{title}:</p>
				<p className="text-sm">{description}</p>
			</div>
			{children}
		</div>
	);
}
