import { __ } from '@wp-plugins/i18n';
import { registerBlockType } from '@wordpress/blocks';

import { blockAttributes } from './constants';
import { Output } from './Output';
import { Edit } from './Edit';

import './style.scss';

registerBlockType('wptelegram/widget-channel-feed', {
	title: __('Telegram Channel Feed'),
	icon: 'format-aside',
	category: 'wptelegram',
	attributes: blockAttributes,
	edit: Edit,
	save: ({ attributes }) => {
		return (
			<div>
				<Output attributes={attributes} />
			</div>
		);
	},
});
