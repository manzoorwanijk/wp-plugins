import { Text } from '@wp-plugins/adapters';
import { __ } from '@wp-plugins/i18n';
import { VerticalDivider } from '@wp-plugins/components';

export const And: React.FC = () => {
	return (
		<VerticalDivider height='0.5em'>
			<Text>{__('AND')}</Text>
		</VerticalDivider>
	);
};
