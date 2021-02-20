import { useCallback } from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { Dashicon, PanelBody, TextControl } from '@wordpress/components';
import type { BlockEditProps } from '@wordpress/blocks';

import { __ } from '@wp-plugins/i18n';

import { AjaxWidgetAtts } from '../types';
import { Output } from './Output';

export const Edit: React.FC<BlockEditProps<AjaxWidgetAtts>> = ({ attributes, setAttributes, className }) => {
	const { widget_width, widget_height } = attributes;

	const onChangeWidth = useCallback((newWidth) => setAttributes({ widget_width: newWidth }), [setAttributes]);
	const onChangeHeight = useCallback((newHeight) => setAttributes({ widget_height: newHeight }), [setAttributes]);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Widget Options')}>
					<TextControl label={__('Widget Width')} value={widget_width} onChange={onChangeWidth} />
					<TextControl
						label={__('Widget Height')}
						value={widget_height}
						onChange={onChangeHeight}
						type='number'
					/>
				</PanelBody>
			</InspectorControls>
			<div className={className}>
				<label>
					<Dashicon icon='shortcode' />
					<span>{__('Telegram Channel Ajax Feed')}</span>
				</label>
				<code className='widget-shortcode'>
					<Output attributes={attributes} />
				</code>
			</div>
		</>
	);
};
