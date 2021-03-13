import { useMemo } from 'react';

import { Divider } from '@wp-plugins/adapters';
import { __ } from '@wp-plugins/i18n';
import { FormField, useWatch } from '@wp-plugins/form';

import { getFieldLabel } from '../../../services';
import { PREFIX } from '../constants';
import { SingleMessage } from './SingleMessage';

const ImageSettings: React.FC = () => {
	const isDisabled = !useWatch({ name: `${PREFIX}.send_featured_image` });

	const image_position_options = useMemo(
		() => [
			{
				value: 'before',
				label: __('Before the Text'),
				isDisabled,
			},
			{
				value: 'after',
				label: __('After the Text'),
				isDisabled,
			},
		],
		[isDisabled]
	);
	return (
		<>
			<FormField
				description={__('Send Featured Image (if exists).')}
				fieldType='switch'
				label={getFieldLabel('send_featured_image')}
				name={`${PREFIX}.send_featured_image`}
			/>
			<Divider />
			<FormField
				fieldType='radio'
				isDisabled={isDisabled}
				label={getFieldLabel('image_position')}
				name={`${PREFIX}.image_position`}
				options={image_position_options}
			/>
			<Divider />
			<SingleMessage isDisabled={isDisabled} />
		</>
	);
};

export default ImageSettings;
