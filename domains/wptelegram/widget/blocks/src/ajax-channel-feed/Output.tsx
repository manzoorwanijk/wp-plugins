import type { BlockEditProps } from '@wordpress/blocks';

import { buildShortCodeFromAtts } from '@wp-plugins/utilities/src/blocks';
import { AjaxWidgetAtts } from '../types';

const allowedAtts = ['widget_width', 'widget_height'];
const shortcode = 'wptelegram-ajax-widget';

export const Output: React.FC<Pick<BlockEditProps<AjaxWidgetAtts>, 'attributes'>> = ({ attributes }) => {
	return <>{buildShortCodeFromAtts(attributes, allowedAtts, shortcode)}</>;
};
