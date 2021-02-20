import type { Block } from '@wordpress/blocks';

import { AjaxWidgetAtts } from '../types';

export const blockAttributes: Block<AjaxWidgetAtts>['attributes'] = {
	widget_width: {
		type: 'string',
		default: '100%',
	},
	widget_height: {
		type: 'string',
		default: '600',
	},
};
