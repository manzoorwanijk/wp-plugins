import { registerBlockType } from '@wordpress/blocks';

import { __ } from '@wp-plugins/i18n';

import { JoinButton } from './JoinButton';
import { Controls } from './Controls';
import { TelegramIcon } from './TelegramIcon';

import { blockAttributes } from './constants';

import './style.scss';

registerBlockType('wptelegram/widget-join-channel', {
	title: __('Join Telegram Channel'),
	icon: <TelegramIcon fill='#555d66' />,
	category: 'wptelegram',
	attributes: blockAttributes,
	getEditWrapperProps: (attributes) => {
		const { alignment } = attributes;
		if (['left', 'center', 'right', 'wide', 'full'].includes(alignment)) {
			return { 'data-align': alignment };
		}
	},
	edit: ({ attributes, setAttributes, className }) => {
		return (
			<>
				<Controls attributes={attributes} setAttributes={setAttributes} />
				<div className={className}>
					<JoinButton {...attributes} isEditing />
				</div>
			</>
		);
	},
	save: ({ attributes }) => {
		const { alignment } = attributes;

		return (
			<div className={'wp-block-wptelegram-widget-join-channel align' + alignment}>
				<JoinButton {...attributes} />
			</div>
		);
	},
});
