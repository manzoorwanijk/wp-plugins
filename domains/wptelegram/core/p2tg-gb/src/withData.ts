import { compose } from '@wordpress/compose';
import { withDispatch, withSelect } from '@wordpress/data';

import { __KEY__ } from './constants';
import { DataShape, WithDataProps } from './types';

const DEFAULT_DATA: DataShape = {
	channels: [],
	delay: '0',
	disable_notification: false,
	message_template: '',
	override_switch: false,
	send2tg: true,
	...window.wptelegram?.savedSettings,
};

type WithData = <P extends WithDataProps>(component: React.ComponentType<P>) => React.ComponentType<Partial<P>>;

export const withData: WithData = compose([
	withSelect(
		(select): Partial<WithDataProps> => {
			const data: DataShape = select('core/editor').getEditedPostAttribute(__KEY__) || DEFAULT_DATA;
			return { data };
		}
	),
	withDispatch(
		(dispatch, _, { select }): Partial<WithDataProps> => {
			const updateField: WithDataProps['updateField'] = (field) => {
				return (value) => {
					const data: DataShape = select('core/editor').getEditedPostAttribute(__KEY__) || DEFAULT_DATA;

					dispatch('core/editor').editPost({ [__KEY__]: { ...data, [field]: value } }, { undoIgnore: true });
				};
			};
			return { updateField };
		}
	),
]);
