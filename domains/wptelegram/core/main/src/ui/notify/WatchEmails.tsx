import { Stack, StackItem, StackProps } from '@wp-plugins/adapters';
import { Code, useChatWithTest } from '@wp-plugins/components';
import { sprintf, __ } from '@wp-plugins/i18n';
import { FormField, useFormContext } from '@wp-plugins/form';
import { createInterpolateElement } from '@wp-plugins/utilities';

import { getFieldLabel, DataShape } from '../../services';
import { PREFIX } from './constants';
import { Upsell } from '../Upsell';

const direction: StackProps['direction'] = ['column', 'row'];

export const WatchEmails: React.FC = () => {
	const { watch } = useFormContext<DataShape>();
	const bot_token = watch('bot_token');
	const { button, result, onBlur } = useChatWithTest(bot_token);

	return (
		<>
			<FormField
				after={createInterpolateElement(
					sprintf(__('If you want to receive notification for every email, then write %s.'), '<Code />'),
					{ Code: <Code>any</Code> }
				)}
				fieldType='text'
				label={getFieldLabel('watch_emails')}
				name={`${PREFIX}.watch_emails`}
				maxWidth='350px'
			/>
			<Upsell location='watch-emails' textAlign='center' />
			<Stack spacing={8} direction={direction}>
				<StackItem>
					<FormField
						button={button}
						description={__('Telegram User or Group Chat ID.')}
						fieldType='text.button'
						isRepeatable
						label={getFieldLabel('chat_ids')}
						name={`${PREFIX}.chat_ids`}
						onBlur={onBlur}
						placeholder='98765432'
					/>
				</StackItem>
				<StackItem>{result}</StackItem>
			</Stack>
		</>
	);
};
