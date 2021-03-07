import { sprintf, __ } from '@wp-plugins/i18n';
import { Divider } from '@wp-plugins/adapters';
import { Code, SectionCard } from '@wp-plugins/components';
import { FormField } from '@wp-plugins/form';
import { createInterpolateElement } from '@wp-plugins/utilities';

import { getFieldLabel } from '../../../services';
import { PREFIX } from '../constants';

export const MessageKeyboard: React.FC = () => {
	return (
		<SectionCard title={__('Inline Keyboard')}>
			<FormField
				description={__('Add an inline clickable button for the post URL just below the message.')}
				fieldType='switch'
				label={getFieldLabel('inline_url_button')}
				name={`${PREFIX}.inline_url_button`}
			/>
			<Divider />
			<FormField
				fieldType='text'
				label={getFieldLabel('inline_button_text')}
				maxWidth='200px'
				name={`${PREFIX}.inline_button_text`}
				placeholder={__('View Post')}
			/>
			<Divider />
			<FormField
				fieldType='text'
				label={getFieldLabel('inline_button_url')}
				maxWidth='400px'
				name={`${PREFIX}.inline_button_url`}
				placeholder='{full_url}'
				after={createInterpolateElement(
					/* translators: template tag/macro */
					sprintf(__('You can specify any custom field like %s.'), '<Macro />'),
					{ Macro: <Code>{'{cf:_product_url}'}</Code> }
				)}
				description={__('Source of the button URL.')}
			/>
		</SectionCard>
	);
};
