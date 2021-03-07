import { useCallback, useState } from 'react';

import { __, sprintf } from '@wp-plugins/i18n';
import { FormField } from '@wp-plugins/form';
import { BotTokenField } from '@wp-plugins/components';

import { getFieldLabel } from '../../services';
import { Instructions } from './Instructions';

export const Basics: React.FC = () => {
	const [botUsernameReadOnly, setBotUsernameReadOnly] = useState(true);
	const botUsernameDoubleClick = useCallback(() => setBotUsernameReadOnly(false), []);

	return (
		<>
			<Instructions />
			<BotTokenField
				botUsernameField='bot_username'
				isRequired
				label={getFieldLabel('bot_token')}
				name='bot_token'
			/>
			<FormField
				addonBefore='@'
				description={sprintf(__('Use %s above to set automatically.'), __('Test Token'))}
				fieldType='text'
				isReadOnly={botUsernameReadOnly}
				label={getFieldLabel('bot_username')}
				maxW='200px'
				name='bot_username'
				onDoubleClick={botUsernameDoubleClick}
			/>
		</>
	);
};
