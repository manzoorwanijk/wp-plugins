import { __ } from '@wp-plugins/i18n';
import { FormField, useFormContext } from '@wp-plugins/form';
import { SectionCard, useChatWithTest } from '@wp-plugins/components';
import { Stack, StackProps, StackItem } from '@wp-plugins/adapters';

import { getFieldLabel, DataShape } from '../../services';
import { PREFIX } from './constants';
import { Upsell } from '../Upsell';

const direction: StackProps['direction'] = ['column', 'row'];

export const Destination: React.FC = () => {
	const { watch } = useFormContext<DataShape>();
	const bot_token = watch('bot_token');

	const { button, memberCount, result, onBlur } = useChatWithTest(bot_token);

	return (
		<SectionCard title={__('Destination')}>
			<Stack spacing={8} direction={direction}>
				<StackItem>
					<FormField
						button={button}
						description={__('Channel Username or Chat ID.')}
						fieldType='text.button'
						isRepeatable
						label={getFieldLabel('channels')}
						name={`${PREFIX}.channels`}
						onBlur={onBlur}
						placeholder='@username'
					/>
				</StackItem>
				<StackItem>
					{memberCount}
					{result}
				</StackItem>
			</Stack>
			<Upsell location='channels' textAlign='center' />
		</SectionCard>
	);
};
