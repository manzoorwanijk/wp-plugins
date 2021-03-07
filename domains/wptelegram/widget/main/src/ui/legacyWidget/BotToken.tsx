import { useEffect } from 'react';

import { BotTokenField } from '@wp-plugins/components';
import { useFormContext } from '@wp-plugins/form';

import { getFieldLabel, DataShape } from '../../services';
import { PREFIX } from './constants';

export const BotToken: React.FC = () => {
	const { trigger, watch } = useFormContext<DataShape>();

	const username = watch<string, string>(`${PREFIX}.username`);

	useEffect(() => {
		if (!username) {
			// trigger validation for bot_token when username is removed
			trigger(`${PREFIX}.bot_token`);
		}
	}, [trigger, username]);

	return (
		<BotTokenField name={`${PREFIX}.bot_token`} isRequired={Boolean(username)} label={getFieldLabel('bot_token')} />
	);
};
