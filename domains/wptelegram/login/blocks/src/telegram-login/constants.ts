import type { Block } from '@wordpress/blocks';

import { TelegramLoginAtts } from './types';

export const blockAttributes: Block<TelegramLoginAtts>['attributes'] = {
	button_style: {
		type: 'string',
		default: 'large',
	},
	show_user_photo: {
		type: 'boolean',
		default: true,
	},
	corner_radius: {
		type: 'string',
		default: '20',
	},
	show_if_user_is: {
		type: 'string',
		default: '0',
	},
};
