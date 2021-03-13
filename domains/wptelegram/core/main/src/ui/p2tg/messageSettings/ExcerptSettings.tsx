import { Divider } from '@wp-plugins/adapters';
import { __ } from '@wp-plugins/i18n';
import { FormField, useWatch } from '@wp-plugins/form';

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
	const template = useWatch<string>({ name: `${PREFIX}.message_template` }) || '';
	const hasExcerpt = template.includes('{post_excerpt}');

	return (
		<>
			<FormField
				name={`${PREFIX}.excerpt_source`}
				fieldType='select'
				label={getFieldLabel('excerpt_source')}
				options={options}
				isDisabled={!hasExcerpt}
			/>
			<Divider />
			<FormField
				name={`${PREFIX}.excerpt_length`}
				fieldType='number'
				label={getFieldLabel('excerpt_length')}
				description={__('Number of words for the excerpt.')}
				valueAsNumber
				isDisabled={!hasExcerpt}
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
				isDisabled={!hasExcerpt}
			/>
		</>
	);
};

export default ExcerptSettings;
