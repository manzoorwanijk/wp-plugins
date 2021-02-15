import { useCallback } from 'react';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RadioControl, ToggleControl, TextControl, SelectControl } from '@wordpress/components';
import type { BlockEditProps } from '@wordpress/blocks';

import { TelegramLoginAtts } from './types';
import { useData } from './useData';
import { Output } from './Output';

const buttonStyleOptions = [
	{ label: __('Large'), value: 'large' },
	{ label: __('Medium'), value: 'medium' },
	{ label: __('Small'), value: 'small' },
];

export const Edit: React.FC<BlockEditProps<TelegramLoginAtts>> = ({ attributes, setAttributes, className }) => {
	const { button_style, show_user_photo, corner_radius, show_if_user_is } = attributes;

	const uiData = useData('uiData');

	const onChangeButtonStyle = useCallback((newStyle) => setAttributes({ button_style: newStyle }), [setAttributes]);
	const onChangeShowUserPhoto = useCallback(
		(new_show_user_photo) => setAttributes({ show_user_photo: new_show_user_photo }),
		[setAttributes]
	);
	const onChangeCornerRadius = useCallback((newRadius) => setAttributes({ corner_radius: newRadius }), [
		setAttributes,
	]);
	const onChangeShowIfUserIs = useCallback((value) => setAttributes({ show_if_user_is: value }), [setAttributes]);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Button Settings')}>
					<RadioControl
						label={__('Button Style')}
						selected={button_style}
						onChange={onChangeButtonStyle}
						options={buttonStyleOptions}
					/>
					<ToggleControl
						label={__('Show User Photo')}
						checked={show_user_photo}
						onChange={onChangeShowUserPhoto}
					/>
					<TextControl
						label={__('Corner Radius')}
						value={corner_radius}
						onChange={onChangeCornerRadius}
						type='number'
						min='0'
						max='20'
					/>
					<SelectControl
						label={__('Show if user is')}
						value={show_if_user_is}
						onChange={onChangeShowIfUserIs}
						options={uiData.show_if_user_is as any}
					/>
				</PanelBody>
			</InspectorControls>
			<Output attributes={attributes} className={className} />
		</>
	);
};
