import { useCallback } from '@wordpress/element';
import { BaseControl, CheckboxControl } from '@wordpress/components';

import { __ } from '@wp-plugins/i18n';

import { withData } from './withData';
import { WithDataProps } from './types';

const allChannels = window.wptelegram?.uiData?.allChannels || [];

export const Channels: React.FC<WithDataProps & { isDisabled?: boolean }> = ({ data, isDisabled, updateField }) => {
	const onChange = useCallback(
		(channel) => () => {
			const hasChannel = data.channels.indexOf(channel) !== -1;
			const newChannels = hasChannel ? data.channels.filter((c) => c !== channel) : [...data.channels, channel];
			updateField('channels')(newChannels);
		},
		[data.channels, updateField]
	);

	return (
		<BaseControl id='wptg-send-to' label={__('Send to')}>
			<div role='group' id='wptg-send-to' aria-label={__('Send to')}>
				{allChannels.map((channel, index) => {
					return (
						<CheckboxControl
							key={channel + index}
							label={channel}
							disabled={isDisabled}
							checked={data.channels.indexOf(channel) !== -1}
							onChange={onChange(channel)}
						/>
					);
				})}
			</div>
		</BaseControl>
	);
};

export default withData(Channels);
