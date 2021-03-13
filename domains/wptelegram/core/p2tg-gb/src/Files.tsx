import { useCallback } from '@wordpress/element';
import { BaseControl, Disabled, Flex, Button, Icon } from '@wordpress/components';
import { MediaUpload } from '@wordpress/media-utils';
import { __ } from '@wp-plugins/i18n';

import { withData } from './withData';
import { WithDataProps } from './types';

const render: MediaUpload.Props<true>['render'] = ({ open }) => (
	<Button isSecondary onClick={open} id='wptg-upload-media'>
		{__('Add or Upload Files')}
	</Button>
);

const allowedTypes = [];

export const Files: React.FC<WithDataProps & { isDisabled?: boolean }> = ({ data, isDisabled, updateField }) => {
	const onRemove = useCallback(
		(id) => () => {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { [id]: _, ...files } = data.files;
			updateField('files')(files);
		},
		[data.files, updateField]
	);

	const onSelect = useCallback(
		(files: Array<{ id: number; url?: string }>) => {
			const newFiles = files.reduce((acc, { id, url }) => ({ ...acc, [id]: url }), {});
			updateField('files')(newFiles);
		},
		[updateField]
	);

	return (
		<Disabled
			// @ts-ignore
			isDisabled={isDisabled}
		>
			<BaseControl id='wptg-files' label={__('Files')} help={__('Files to be sent after the message.')}>
				<br />
				<MediaUpload multiple onSelect={onSelect} allowedTypes={allowedTypes} render={render} />
				<ul role='group' id='wptg-files' aria-label={__('Files')}>
					{Object.entries(data.files).map(([id, url], index) => {
						const urlParts = url.split('/');
						const name = urlParts[urlParts.length - 1];
						return (
							<li key={id + index}>
								<Flex justify='flex-start'>
									<Button icon={<Icon icon='no-alt' />} onClick={onRemove(id)} />
									<span>{name}</span>
								</Flex>
							</li>
						);
					})}
				</ul>
			</BaseControl>
		</Disabled>
	);
};

export default withData(Files);
