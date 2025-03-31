import { IconType } from 'react-icons';
import { ImLinkedin } from 'react-icons/im';
import { FaGithubSquare } from 'react-icons/fa';
import Link from 'next/link';

interface ContactListProps {
	icon: IconType;
	title: string;
	url: string;
}

const contactList: ContactListProps[] = [
	{
		icon: ImLinkedin,
		title: 'Leonardo Braga | Linkedin',
		url: 'https://www.linkedin.com/in/leonardo-braga-8b7856216/',
	},
	{
		icon: FaGithubSquare,
		title: 'Leonardo Braga | GitHub',
		url: 'https://github.com/code-front-braga',
	},
];

export function SiteFooter() {
	const contactDetails = contactList.map(contact => {
		return (
			<Link
				key={contact.url}
				href={contact.url}
				className="flex items-center gap-2.5 text-white"
			>
				<contact.icon size={22} />
				{contact.title}
			</Link>
		);
	});

	return (
		<footer className="bg-cabaret relative z-10 py-6 text-center text-white">
			<div className="container mx-auto flex flex-col items-center gap-4">
				<p className="text-sm leading-normal">
					Experimente o e-Listou! e simplifique sua rotina de supermercado!
				</p>

				<ul className="flex flex-col gap-2.5">{contactDetails}</ul>
			</div>
		</footer>
	);
}
