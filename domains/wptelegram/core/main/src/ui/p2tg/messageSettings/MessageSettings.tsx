import { Divider } from '@wp-plugins/adapters';
import { __ } from '@wp-plugins/i18n';
import { FormField } from '@wp-plugins/form';
import { SectionCard } from '@wp-plugins/components';

import { getFieldLabel } from '../../../services';
import { PREFIX } from '../constants';
import { TemplateInfo } from './TemplateInfo';
import ExcerptSettings from './ExcerptSettings';
import ImageSettings from './ImageSettings';
import { ParseModeField } from '../../ParseModeField';

export const MessageSettings: React.FC = () => {
	return (
		<SectionCard title={__('Message Settings')}>
			<FormField
				name={`${PREFIX}.message_template`}
				fieldType='textarea'
				description={__('Structure of the message to be sent.')}
				label={getFieldLabel('message_template')}
				rows={10}
				height='auto'
			/>
			<TemplateInfo />
			<ExcerptSettings />
			<Divider />
			<ImageSettings />
			<Divider />
			<FormField
				name={`${PREFIX}.cats_as_tags`}
				fieldType='switch'
				label={getFieldLabel('cats_as_tags')}
				description={__('Send categories as hashtags.')}
			/>
			<Divider />
			<ParseModeField name={`${PREFIX}.parse_mode`} label={getFieldLabel('parse_mode')} />
			<Divider />
			<FormField
				name={`${PREFIX}.disable_web_page_preview`}
				fieldType='switch'
				label={getFieldLabel('disable_web_page_preview')}
				description={__('Disables previews for links in the messages.')}
			/>
		</SectionCard>
	);
};
