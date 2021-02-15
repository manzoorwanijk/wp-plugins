import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

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
