interface SiteSectionProps {
	children: Readonly<React.ReactNode>;
	id: string;
	className: string;
}

export function SiteSection({ children, id, className }: SiteSectionProps) {
	return (
		<section id={id} className={className}>
			{children}
		</section>
	);
}
