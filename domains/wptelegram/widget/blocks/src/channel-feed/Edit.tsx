import { useCallback } from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { Dashicon, PanelBody, TextControl, RadioControl } from '@wordpress/components';
import type { BlockEditProps } from '@wordpress/blocks';

import { __ } from '@wp-plugins/i18n';

import { LegacyWidgetAtts } from '../types';
import { Output } from './Output';

const authorPhotoOptions = [
	{ label: 'Auto', value: 'auto' },
	{ label: 'Always show', value: 'always_show' },
	{ label: 'Always hide', value: 'always_hide' },
];

export const Edit: React.FC<BlockEditProps<LegacyWidgetAtts>> = ({ attributes, setAttributes, className }) => {
	const { widget_width, author_photo, num_messages } = attributes;

	const onChangeAuthorPhoto = useCallback((newStyle) => setAttributes({ author_photo: newStyle }), [setAttributes]);
	const onChangeWidth = useCallback((newWidth) => setAttributes({ widget_width: newWidth }), [setAttributes]);
	const onChangeNum = useCallback((newValue) => setAttributes({ num_messages: newValue }), [setAttributes]);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Widget Options')}>
					<TextControl
						label={__('Widget Width')}
						value={widget_width}
						onChange={onChangeWidth}
						type='number'
						min='10'
						max='100'
					/>
					<RadioControl
						label={__('Author Photo')}
						selected={author_photo}
						onChange={onChangeAuthorPhoto}
						options={authorPhotoOptions}
					/>
					<TextControl
						label={__('Number of Messages')}
						value={num_messages}
						onChange={onChangeNum}
						type='number'
						min='1'
						max='50'
					/>
				</PanelBody>
			</InspectorControls>
			<div className={className} key='shortcode'>
				<label>
					<Dashicon icon='shortcode' />
					<span>{__('Telegram Channel Feed')}</span>
				</label>
				<code className='widget-shortcode'>
					<Output attributes={attributes} />
				</code>
			</div>
		</>
	);
};
