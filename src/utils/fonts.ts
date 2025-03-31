import { Poiret_One, Lato } from 'next/font/google';

const poiretOne = Poiret_One({
	subsets: ['latin'],
	weight: ['400'],
	preload: true,
});

const lato = Lato({
	subsets: ['latin'],
	weight: ['400', '700', '900'],
	preload: true,
});

export { poiretOne, lato };
