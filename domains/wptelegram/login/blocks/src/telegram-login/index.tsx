import { registerBlockType } from '@wordpress/blocks';

import { __ } from '@wp-plugins/i18n';

import { blockAttributes } from './constants';
import { TelegramLoginAtts } from './types';
import { Output } from './Output';
import { Edit } from './Edit';

import './style.scss';

registerBlockType<TelegramLoginAtts>('wptelegram/login', {
	title: __('WP Telegram Login'),
	icon: 'smartphone',
	category: 'wptelegram',
	attributes: blockAttributes,
	edit: Edit,

	save(props) {
		return <Output attributes={props.attributes} className={null} />;
	},
	deprecated: [
		{
			attributes: blockAttributes,
			save(props) {
				return <Output attributes={props.attributes} className={null} />;
			},
		},
	],
});
