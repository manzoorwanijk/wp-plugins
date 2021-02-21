import { Description } from '@wp-plugins/components';
import { __ } from '@wp-plugins/i18n';
import { FormField } from '@wp-plugins/form';

import { getFieldLabel } from '../../services';
import { Instructions } from './Instructions';
import { LegacyWidgetInfo } from './LegacyWidgetInfo';
import { PREFIX } from './constants';
import { BotToken } from './BotToken';
import { Username } from './Username';

const authorPhotoOptions = [
	{ value: 'auto', label: __('Auto') },
	{ value: 'always_show', label: __('Always show') },
	{ value: 'always_hide', label: __('Always hide') },
];

export const LegacyWidget: React.FC = () => {
	return (
		<>
			<Description>
				{__('Legacy widget is a full height widget which supports both channels and groups.')}
			</Description>
			<Instructions />
			<Username />
			<BotToken />
			<FormField
				fieldType='text'
				label={getFieldLabel('width')}
				maxW='130px'
				name={`${PREFIX}.width`}
				placeholder={`300 ${__('or')} 100%`}
			/>
			<FormField
				fieldType='select'
				label={getFieldLabel('author_photo')}
				name={`${PREFIX}.author_photo`}
				options={authorPhotoOptions}
			/>
			<FormField
				label={getFieldLabel('num_messages')}
				description={__('Number of messages to display in the widget.')}
				fieldType='number'
				min={1}
				max={50}
				maxWidth='100px'
				name={`${PREFIX}.num_messages`}
				placeholder='5'
			/>
			<LegacyWidgetInfo />
		</>
	);
};
