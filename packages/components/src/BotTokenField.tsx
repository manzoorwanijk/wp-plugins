import { useEffect } from 'react';

import { __ } from '@wp-plugins/i18n';
import { FormField, useFormContext } from '@wp-plugins/form';

import { useBotTokenTest } from './useBotTokenTest';

const botTokenAddonProps = { px: '0' };

export type BotTokenFieldProps = {
	botUsernameField?: string;
	isRequired?: boolean;
	label: React.ReactNode;
	name: string;
};

export const BotTokenField: React.FC<BotTokenFieldProps> = ({ botUsernameField, isRequired = true, label, name }) => {
	const { errors, setValue, trigger, watch } = useFormContext();

	const bot_token = watch(name);

	const { bot_username, button, result } = useBotTokenTest(bot_token, Boolean(errors[name]));

	useEffect(() => {
		if (botUsernameField && bot_username) {
			setValue(botUsernameField, bot_username);
			trigger(botUsernameField);
		}
	}, [botUsernameField, bot_username, setValue, trigger]);

	return (
		<FormField
			addonAfter={button}
			addonAfterProps={botTokenAddonProps}
			after={result}
			borderEnd='0'
			borderEndRadius='0'
			description={__('Please read the instructions above.')}
			fieldType='text'
			isRequired={isRequired}
			label={label}
			maxW='350px'
			name={name}
		/>
	);
};
