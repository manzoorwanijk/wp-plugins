import { useMemo } from 'react';

import { Divider, Box, Link, Text } from '@wp-plugins/adapters';
import { Description, Code } from '@wp-plugins/components';
import { __ } from '@wp-plugins/i18n';
import { FormField } from '@wp-plugins/form';

import { getFieldLabel, useData } from '../../services';
import { PREFIX } from './constants';

export const Advanced: React.FC = () => {
	const { assets, uiData } = useData();

	const log_options = useMemo(
		() => [
			{
				value: 'bot_api',
				label: (
					<>
						{__('Bot API')}&ensp;[<Link href={assets.botApiLogUrl}>{__('View log')}</Link>]
					</>
				),
			},
			{
				value: 'p2tg',
				label: (
					<>
						{__('Post to Telegram')}&ensp;[<Link href={assets.p2tgLogUrl}>{__('View log')}</Link>]
					</>
				),
			},
		],
		[assets]
	);

	return (
		<>
			<Description>
				{__('Settings in this section should not be changed unless recommended by WP Telegram Support.')}
			</Description>
			<FormField
				name={`${PREFIX}.send_files_by_url`}
				fieldType='switch'
				label={getFieldLabel('send_files_by_url')}
				description={__('Turn off to upload the files/images instead of passing the url.')}
			/>
			<Divider />
			<FormField
				name={`${PREFIX}.enable_logs`}
				fieldType='multicheck'
				label={getFieldLabel('enable_logs')}
				options={log_options}
			/>
			<Divider />
			<Box>
				<Text fontWeight='500'>{getFieldLabel('debug_info')}</Text>
				<Code>{uiData.debug_info}</Code>
			</Box>
			<Divider />
			<FormField name={`${PREFIX}.clean_uninstall`} fieldType='switch' label={getFieldLabel('clean_uninstall')} />
		</>
	);
};
