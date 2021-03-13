import { sprintf, __ } from '@wp-plugins/i18n';
import { FormField } from '@wp-plugins/form';
import { SectionCard } from '@wp-plugins/components';
import { Divider, Text } from '@wp-plugins/adapters';

import { getFieldLabel, useData } from '../../services';
import { PREFIX } from './constants';

export const Miscellaneous: React.FC = () => {
	const { is_wp_cron_disabled } = useData('uiData');

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
				after={
					<>
						&nbsp;{__('Minute(s)')}
						{is_wp_cron_disabled && (
							<>
								<br />
								<Text color='red.500'>{__('WordPress cron should not be disabled!')}</Text>
							</>
						)}
					</>
				}
				display='inline-flex'
				valueAsNumber
				maxWidth='100px'
			/>
			<Divider />
			<FormField
				description={sprintf(
					'%s %s',
					__('Send the messages silently.'),
					__('Users will receive a notification with no sound.')
				)}
				fieldType='switch'
				label={getFieldLabel('disable_notification')}
				name={`${PREFIX}.disable_notification`}
			/>
		</SectionCard>
	);
};
