import { __ } from '@wp-plugins/i18n';
import { FormField } from '@wp-plugins/form';
import { SectionCard } from '@wp-plugins/components';
import { Divider } from '@wp-plugins/adapters';

import { getFieldLabel, useData } from '../../../services';
import { PREFIX } from '../constants';
import { And } from './And';
import { CustomRules } from './CustomRules';

const send_when_options = [
	{
		value: 'new',
		label: __('A new post is published'),
	},
	{
		value: 'existing',
		label: __('An existing post is updated'),
	},
];

export const Rules: React.FC = () => {
	const { post_types } = useData('uiData');
	return (
		<SectionCard title={__('Rules')}>
			<FormField
				name={`${PREFIX}.send_when`}
				fieldType='multicheck'
				label={getFieldLabel('send_when')}
				description={__('When the post should be sent to Telegram.')}
				options={send_when_options}
			/>
			<Divider />
			<FormField
				name={`${PREFIX}.post_types`}
				fieldType='multicheck'
				label={getFieldLabel('post_types')}
				description={__('Which post types should be sent.')}
				options={post_types}
			/>
			<Divider my='0' />
			<And />
			<CustomRules />
		</SectionCard>
	);
};
