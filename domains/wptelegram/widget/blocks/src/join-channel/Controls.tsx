import { Fragment, useEffect, useCallback } from 'react';

import { BlockAlignmentToolbar, BlockControls, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

import { __ } from '@wp-plugins/i18n';

import { useData } from '../useData';

export const Controls = ({ setAttributes, attributes }) => {
	const { alignment, link, text } = attributes;

	const { join_link_text, join_link_url } = useData('uiData');

	useEffect(() => {
		if (!link) {
			setAttributes({ link: join_link_url });
		}
		if (!text) {
			setAttributes({ text: join_link_text });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onChangeChannelLink = useCallback((newValue) => setAttributes({ link: newValue }), [setAttributes]);
	const onChangeButtonText = useCallback((newValue) => setAttributes({ text: newValue }), [setAttributes]);
	const onChangeAlign = useCallback((align) => setAttributes({ alignment: align }), [setAttributes]);

	return (
		<Fragment>
			<InspectorControls key='controls'>
				<PanelBody title={__('Button details')}>
					<TextControl
						label={__('Channel Link')}
						value={link || ''}
						onChange={onChangeChannelLink}
						type='url'
					/>
					<TextControl label={__('Button text')} value={text || ''} onChange={onChangeButtonText} />
				</PanelBody>
			</InspectorControls>
			<BlockControls>
				<BlockAlignmentToolbar value={alignment} onChange={onChangeAlign} />
			</BlockControls>
		</Fragment>
	);
};
