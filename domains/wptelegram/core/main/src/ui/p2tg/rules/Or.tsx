import { Text } from '@wp-plugins/adapters';
import { __ } from '@wp-plugins/i18n';
import { VerticalDivider } from '@wp-plugins/components';

export const Or: React.FC = () => {
	return (
		<VerticalDivider>
			<Text>{__('OR')}</Text>
		</VerticalDivider>
	);
};
