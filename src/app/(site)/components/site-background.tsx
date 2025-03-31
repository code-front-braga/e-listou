import Image from 'next/image';

export function SiteBackground() {
	return (
		<Image
			src="/site-bg.jpg"
			alt="Uma mulher sentada dentro de um carrinho de supermercado."
			fill
			quality={100}
			priority
			className="object-cover opacity-35 contrast-125 sepia-50"
		/>
	);
}
