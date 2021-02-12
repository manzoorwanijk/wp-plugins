import { __ } from '@wp-plugins/i18n';
import { SectionCard } from '../SectionCard';

const headerProps = {
	backgroundColor: '#343a40',
	color: '#fff',
};

export const Instructions: React.FC = ({ children }) => {
	return (
		<SectionCard title={__('INSTRUCTIONS!')} headerProps={headerProps}>
			{children}
		</SectionCard>
	);
};
