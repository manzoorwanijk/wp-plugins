import { useChatWithTest } from '@wp-plugins/components';
import { __ } from '@wp-plugins/i18n';
import { FormField, useFormContext } from '@wp-plugins/form';

import { getFieldLabel, DataShape } from '../../services';
import { PREFIX } from './constants';

export const Username: React.FC = () => {
	const { watch } = useFormContext<DataShape>();
	const bot_token = watch<string, string>(`${PREFIX}.bot_token`);

	const { button, memberCount, result, onBlur } = useChatWithTest(bot_token);
	return (
		<>
			<FormField
				addonBefore='@'
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
