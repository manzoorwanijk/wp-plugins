import type { BlockEditProps } from '@wordpress/blocks';

import { buildShortCodeFromAtts } from '@wp-plugins/utilities/src/blocks';
import { AjaxWidgetAtts } from '../types';

const allowedAtts = ['author_photo', 'num_messages', 'widget_width'];
const shortcode = 'wptelegram-widget';

export const Output: React.FC<Pick<BlockEditProps<AjaxWidgetAtts>, 'attributes'>> = ({ attributes }) => {
	return <>{buildShortCodeFromAtts(attributes, allowedAtts, shortcode)}</>;
};
