import { registerPlugin } from '@wordpress/plugins';
import { PluginPostStatusInfo } from '@wordpress/edit-post';
import { ToggleControl } from '@wordpress/components';

import { __ } from '@wp-plugins/i18n';

import EditModal from './EditModal';
import { WithDataProps } from './types';
import { withData } from './withData';

const PostToTelegram: React.FC<WithDataProps> = ({ data, updateField }) => {
	return (
		<PluginPostStatusInfo>
			<ToggleControl
				// the basic switch
				label={__('Send to Telegram')}
				checked={data.send2tg}
				onChange={updateField('send2tg')}
			/>
			<EditModal />
			&nbsp;
		</PluginPostStatusInfo>
	);
};

registerPlugin('wptelegram-post-to-telegram', {
	icon: null,
	render: withData(PostToTelegram),
});
