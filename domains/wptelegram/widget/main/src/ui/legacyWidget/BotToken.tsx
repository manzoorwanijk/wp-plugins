import { useEffect } from 'react';

import { useBotTokenTest } from '@wp-plugins/components';
import { __ } from '@wp-plugins/i18n';
import { FormField, useFormContext } from '@wp-plugins/form';

import { getFieldLabel, FormData } from '../../services';
import { PREFIX } from './constants';

const botTokenAddonProps = { px: '0' };

export const BotToken: React.FC = () => {
	const { errors, trigger, watch } = useFormContext<FormData>();

	const username = watch<string, string>(`${PREFIX}.username`);
	const bot_token = watch<string, string>(`${PREFIX}.bot_token`);

	const { button, result } = useBotTokenTest(bot_token, Boolean(errors.legacy_widget?.bot_token));

	useEffect(() => {
		if (!username) {
			// trigger validation for bot_token when username is removed
			trigger(`${PREFIX}.bot_token`);
		}
	}, [trigger, username]);
	return (
		<>
			<FormField
				addonAfter={button}
				addonAfterProps={botTokenAddonProps}
				after={result}
				borderEnd='0'
				borderEndRadius='0'
				description={__('Please read the instructions above.')}
				fieldType='text'
				isRequired={Boolean(username)}
				label={getFieldLabel('bot_token')}
				maxW='350px'
				name={`${PREFIX}.bot_token`}
			/>
			{result}
		</>
	);
};
