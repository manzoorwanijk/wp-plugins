import { Link } from '@wp-plugins/adapters';
import { __ } from '@wp-plugins/i18n';

interface InstructionsLinkProps {
	link: string;
	text?: string;
}

export const InstructionsLink: React.FC<InstructionsLinkProps> = ({ link, text, children }) => {
	return (
		<Link href={link} isExternal>
			{text || children || __('Click here for instructions.')}
		</Link>
	);
};
