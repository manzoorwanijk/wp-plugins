import { Box, Text } from '@wp-plugins/adapters';
import { __ } from '@wp-plugins/i18n';

export const ProxyDisclaimer: React.FC = () => {
	return (
		<Box my='0.5em'>
			<Text color='red.500' fontWeight='500' as='span'>
				{__('DISCLAIMER!')}
			</Text>{' '}
			<Text as='em'>{__('Use the proxy at your own risk!')}</Text>
		</Box>
	);
};
