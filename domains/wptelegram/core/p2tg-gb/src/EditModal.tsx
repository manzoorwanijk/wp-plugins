import type { CSSProperties } from 'react';
import { useCallback, useState } from '@wordpress/element';
import { ToggleControl, Button, Modal, TextControl, TextareaControl } from '@wordpress/components';

import { sprintf, __ } from '@wp-plugins/i18n';

import { GearIcon } from './GearIcon';
import { withData } from './withData';
import { WithDataProps } from './types';
import Channels from './Channels';
import Files from './Files';

const modalStyles: CSSProperties = {
	width: '100%',
	maxWidth: '650px',
};
const bodyStyles: CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
};

const buttonStyles: CSSProperties = {
	width: '100%',
	justifyContent: 'center',
	marginTop: '2em',
};

const separatorStyles: CSSProperties = {
	height: '1.5em',
};

export const EditModal: React.FC<WithDataProps> = ({ data, updateField }) => {
	const [isOpen, setOpen] = useState(false);
	const openModal = useCallback(() => setOpen(true), []);
	const closeModal = useCallback(() => setOpen(false), []);

	const separator = <div style={separatorStyles}></div>;

	const onRequestClose = useCallback(
		(event) => {
			// Prevent modal close on media upload
			if (event.target.id === 'wptg-upload-media') {
				return;
			}
			closeModal();
		},
		[closeModal]
	);

	return (
		<>
			<Button
				aria-label={__('Override settings')}
				disabled={!data.send2tg}
				icon={<GearIcon />}
				isSmall
				onClick={openModal}
			/>
			{isOpen && (
				<Modal
					isDismissible={false}
					title={sprintf('%s (%s)', __('Post to Telegram'), __('Override settings'))}
					onRequestClose={onRequestClose as any}
					style={modalStyles}
				>
					<div style={bodyStyles}>
						<div>
							<ToggleControl
								label={__('Override settings')}
								checked={data.override_switch}
								onChange={updateField('override_switch')}
							/>
							{separator}
							<Channels isDisabled={!data.override_switch} />
							{separator}
							<Files isDisabled={!data.override_switch} />
							{separator}
							<ToggleControl
								// @ts-ignore
								disabled={!data.override_switch}
								label={__('Disable Notifications')}
								checked={data.disable_notification}
								onChange={updateField('disable_notification')}
							/>
							{separator}
							<TextControl
								disabled={!data.override_switch}
								label={__('Delay in Posting')}
								value={data.delay}
								onChange={updateField('delay')}
								step='0.5'
								min={0}
								type='number'
							/>
							{separator}
							<TextareaControl
								disabled={!data.override_switch}
								label={__('Message Template')}
								value={data.message_template}
								onChange={updateField('message_template')}
								rows={10}
							/>
						</div>

						<Button style={buttonStyles} isPrimary onClick={closeModal}>
							{__('Save Changes')}
						</Button>
					</div>
				</Modal>
			)}
		</>
	);
};

export default withData(EditModal);
