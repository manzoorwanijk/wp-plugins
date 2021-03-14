import { Divider, Text } from '@wp-plugins/adapters';
import { __ } from '@wp-plugins/i18n';
import { FormField } from '@wp-plugins/form';
import { SectionCard, Code } from '@wp-plugins/components';

import { getFieldLabel } from '../../services';
import { PREFIX } from './constants';
import { ParseModeField } from '../ParseModeField';

export const MessageSettings: React.FC = () => {
	return (
		<SectionCard title={__('Message Settings')}>
			<FormField
				name={`${PREFIX}.message_template`}
				fieldType='textarea'
				label={getFieldLabel('message_template')}
				description={__('Structure of the message to be sent.')}
				after={
					<>
						<Text as='span'>{__('You can use any text, emojis or these macros in any order.')}</Text>
						<br />
						{['{email_subject}', '{email_message}'].map((tag, i) => (
							<Code key={i}>{tag}</Code>
						))}
					</>
				}
				rows={10}
				height='auto'
			/>
			<Divider />
			<ParseModeField name={`${PREFIX}.parse_mode`} label={getFieldLabel('parse_mode')} />
		</SectionCard>
	);
};
