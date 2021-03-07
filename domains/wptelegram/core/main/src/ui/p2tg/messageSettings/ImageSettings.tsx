import { Divider } from '@wp-plugins/adapters';
import { __ } from '@wp-plugins/i18n';
import { FormField } from '@wp-plugins/form';

import { getFieldLabel } from '../../../services';
import { PREFIX } from '../constants';

const image_position_options = [
	{
		value: 'before',
		label: __('Before the Text'),
	},
	{
		value: 'after',
		label: __('After the Text'),
	},
];

const ImageSettings: React.FC = () => {
	return (
		<>
			<FormField
				name={`${PREFIX}.send_featured_image`}
				fieldType='switch'
				label={getFieldLabel('send_featured_image')}
				description={__('Send Featured Image (if exists)')}
			/>
			<Divider />
			<FormField
				name={`${PREFIX}.image_position`}
				fieldType='radio'
				label={getFieldLabel('image_position')}
				options={image_position_options}
			/>
			<Divider />
			<FormField
				name={`${PREFIX}.single_message`}
				fieldType='switch'
				label={getFieldLabel('single_message')}
				description={__('Send both text and image in single message')}
			/>
		</>
	);
};

export default ImageSettings;
