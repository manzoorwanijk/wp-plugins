import type { BlockEditProps } from '@wordpress/blocks';

import { TelegramLoginAtts } from './types';
import { useData } from './useData';

export const Output: React.FC<Pick<BlockEditProps<TelegramLoginAtts>, 'attributes' | 'className'>> = ({
	attributes,
	className,
}) => {
	const assets = useData('assets');
	const { button_style, show_user_photo, corner_radius } = attributes;

	let button_width = null;
	if ('small' === button_style) {
		button_width = '100px';
	} else if ('medium' === button_style) {
		button_width = '150px';
	}

	let avatar_width = null;
	if ('small' === button_style) {
		avatar_width = '20px';
	} else if ('medium' === button_style) {
		avatar_width = '30px';
	}

	return (
		<div className={className}>
			{/* eslint-disable-next-line jsx-a11y/alt-text, react-perf/jsx-no-new-object-as-prop */}
			<img src={assets.loginImageUrl} style={{ borderRadius: corner_radius + 'px', width: button_width }} />
			{show_user_photo ? (
				/* eslint-disable-next-line jsx-a11y/alt-text, react-perf/jsx-no-new-object-as-prop */
				<img src={assets.loginAvatarUrl} style={{ width: avatar_width }} />
			) : null}
		</div>
	);
};
