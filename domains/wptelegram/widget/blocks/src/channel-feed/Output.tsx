import type { BlockEditProps } from '@wordpress/blocks';

import { buildShortCodeFromAtts } from '@wp-plugins/utilities/src/blocks';
import { AjaxWidgetAtts } from '../types';

const allowedAtts = ['widget_width', 'author_photo', 'num_messages'];
const shortcode = 'wptelegram-widget';

export const Output: React.FC<Pick<BlockEditProps<AjaxWidgetAtts>, 'attributes'>> = ({ attributes }) => {
	return <>{buildShortCodeFromAtts(attributes, allowedAtts, shortcode)}</>;
};
