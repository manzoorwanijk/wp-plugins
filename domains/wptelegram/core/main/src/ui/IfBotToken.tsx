import { useFormContext } from '@wp-plugins/form';
import { Text } from '@wp-plugins/adapters';
import { __ } from '@wp-plugins/i18n';

import { DataShape } from '../services';

export const IfBotToken: React.FC = ({ children }) => {
	const { watch } = useFormContext<DataShape>();
	const bot_token = watch('bot_token');

	return <>{bot_token ? children : <Text color='red.500'>{__('You must add a bot token.')}</Text>}</>;
};
