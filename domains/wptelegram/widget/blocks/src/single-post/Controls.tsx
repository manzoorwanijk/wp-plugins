import { Fragment } from '@wordpress/element';
import { BlockAlignmentToolbar, BlockControls, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, ToolbarGroup, ToolbarButton } from '@wordpress/components';

import { __ } from '@wp-plugins/i18n';

export const Controls: React.FC<any> = (props) => {
	const { userpic, toggleUserPic, showEditButton, switchBackToURLInput, alignment, changeAlignment } = props;

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Options')}>
					<ToggleControl label={__('Author Photo')} checked={userpic} onChange={toggleUserPic} />
				</PanelBody>
			</InspectorControls>
			<BlockControls>
				<BlockAlignmentToolbar value={alignment} onChange={changeAlignment} />
				<ToolbarGroup>
					{showEditButton && (
						<ToolbarButton
							className='components-toolbar__control'
							title={__('Edit URL')}
							icon='edit'
							onClick={switchBackToURLInput}
						/>
					)}
				</ToolbarGroup>
			</BlockControls>
		</Fragment>
	);
};
