import { useChatWithTest } from '@wp-plugins/components';
import { __ } from '@wp-plugins/i18n';
import { FormField, useFormContext } from '@wp-plugins/form';

import { getFieldLabel, FormData } from '../../services';
import { PREFIX } from './constants';

const addonProps = { px: '0' };

export const Username: React.FC = () => {
	const { watch } = useFormContext<FormData>();
	const bot_token = watch<string, string>(`${PREFIX}.bot_token`);

	const { button, memberCount, result, onBlur } = useChatWithTest(bot_token);
	return (
		<>
			<FormField
				addonBefore='@'
				addonAfterProps={addonProps}
				after={
					<>
						{memberCount}
						{result}
					</>
				}
				button={button}
				description={__('Channel or group username.')}
				fieldType='text.button'
				label={getFieldLabel('username')}
				maxW='200px'
				name={`${PREFIX}.username`}
				placeholder='WPTelegram'
				onBlur={onBlur}
			/>
		</>
	);
};
