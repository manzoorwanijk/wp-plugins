import { __ } from '@wp-plugins/i18n';
import { FormField } from '@wp-plugins/form';
import { SectionCard } from '@wp-plugins/components';
import { Divider } from '@wp-plugins/adapters';

import { getFieldLabel } from '../../services';
import { PREFIX } from './constants';

const misc_options = [
	{
		value: 'disable_web_page_preview',
		label: __('Disable Web Page Preview'),
	},
	{
		value: 'disable_notification',
		label: __('Disable Notifications'),
	},
];

export const Miscellaneous: React.FC = () => {
	return (
		<SectionCard title={__('Miscellaneous')} className='miscellaneous-settings'>
			<FormField
				description={__('Show an ON/OFF switch on the post edit screen.')}
				after={__('You can use this switch to override the above settings for a particular post.')}
				fieldType='switch'
				label={getFieldLabel('post_edit_switch')}
				name={`${PREFIX}.post_edit_switch`}
			/>
			<Divider />
			<FormField
				description={__('Enable this option if you use a plugin to generate posts.')}
				fieldType='switch'
				label={getFieldLabel('plugin_posts')}
				name={`${PREFIX}.plugin_posts`}
			/>
			<Divider />
			<FormField
				name={`${PREFIX}.delay`}
				fieldType='number'
				label={getFieldLabel('delay')}
				info={__('The delay starts after the post gets published.')}
				after={<>{' ' + __('Minute(s)')}</>}
				display='inline-flex'
				maxWidth='100px'
			/>
			<Divider />
			<FormField
				name={`${PREFIX}.misc`}
				fieldType='multicheck'
				label={getFieldLabel('misc')}
				options={misc_options}
			/>
		</SectionCard>
	);
};
