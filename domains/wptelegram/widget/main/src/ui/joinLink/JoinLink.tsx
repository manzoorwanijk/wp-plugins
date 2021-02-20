import { Description } from '@wp-plugins/components';
import { __ } from '@wp-plugins/i18n';
import { FormField } from '@wp-plugins/form';
import { getFieldLabel, useData } from '../../services';
import { JoinLinkInfo } from './JoinLinkInfo';

const prefix = 'join_link';

const positionOptions = [
	{ value: 'before_content', label: __('Before content') },
	{ value: 'after_content', label: __('After content') },
];

export const JoinLink: React.FC = () => {
	const { post_types } = useData('uiData');
	return (
		<>
			<Description>{__('Join link can be automatically added to posts.')}</Description>
			<FormField
				fieldType='text'
				label={getFieldLabel('url')}
				maxW='450px'
				name={`${prefix}.url`}
				placeholder='https://t.me/WPTelegram'
			/>
			<FormField
				fieldType='text'
				label={getFieldLabel('text')}
				maxW='300px'
				name={`${prefix}.text`}
				placeholder='Join @WPTelegram on Telegram'
			/>
			<FormField
				fieldType='multicheck'
				isInline
				label={getFieldLabel('post_types')}
				name={`${prefix}.post_types`}
				options={post_types}
			/>
			<FormField
				fieldType='radio'
				label={getFieldLabel('position')}
				name={`${prefix}.position`}
				options={positionOptions}
			/>
			<FormField
				description={__('Priority with respect to adjacent items.')}
				fieldType='number'
				label={getFieldLabel('priority')}
				max={1000}
				maxW='100px'
				min={1}
				name={`${prefix}.priority`}
				placeholder='10'
			/>
			<JoinLinkInfo />
		</>
	);
};
