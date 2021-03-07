import { Divider } from '@wp-plugins/adapters';
import { __ } from '@wp-plugins/i18n';
import { FormField } from '@wp-plugins/form';

import { getFieldLabel } from '../../../services';
import { PREFIX } from '../constants';

const options = [
	{
		value: 'post_content',
		label: __('Post Content'),
	},
	{
		value: 'before_more',
		label: __('Before "Read More"'),
	},
	{
		value: 'post_excerpt',
		label: __('Post Excerpt'),
	},
];

const ExcerptSettings: React.FC = () => {
	return (
		<>
			<FormField
				name={`${PREFIX}.excerpt_source`}
				fieldType='radio'
				label={getFieldLabel('excerpt_source')}
				options={options}
			/>
			<Divider />
			<FormField
				name={`${PREFIX}.excerpt_length`}
				fieldType='number'
				label={getFieldLabel('excerpt_length')}
				description={__('Number of words for the excerpt.')}
				min={1}
				max={300}
				display='inline-flex'
			/>
			<Divider />
			<FormField
				name={`${PREFIX}.excerpt_preserve_eol`}
				fieldType='switch'
				label={getFieldLabel('excerpt_preserve_eol')}
				description={__('Preserve newlines in Post Excerpt.')}
			/>
		</>
	);
};

export default ExcerptSettings;
