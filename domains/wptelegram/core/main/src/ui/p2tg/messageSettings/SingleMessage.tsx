import { __, sprintf, isRTL } from '@wp-plugins/i18n';
import { Text, List, ListItem } from '@wp-plugins/adapters';
import { FormField, useWatch } from '@wp-plugins/form';
import { createInterpolateElement } from '@wp-plugins/utilities';

import { getFieldLabel } from '../../../services';
import { PREFIX } from '../constants';

export const SingleMessage: React.FC<{ isDisabled?: boolean }> = ({ isDisabled }) => {
	const {
		[`${PREFIX}.disable_web_page_preview`]: disable_preview,
		[`${PREFIX}.image_position`]: image_position,
		[`${PREFIX}.parse_mode`]: parse_mode,
		[`${PREFIX}.single_message`]: single_message,
	} = useWatch<any>({
		name: [
			`${PREFIX}.disable_web_page_preview`,
			`${PREFIX}.image_position`,
			`${PREFIX}.parse_mode`,
			`${PREFIX}.single_message`,
		],
	});

	const showWarning = single_message && image_position === 'after' && (parse_mode === 'none' || disable_preview);

	return (
		<FormField
			description={__('Send both text and image in single message.')}
			fieldType='switch'
			isDisabled={isDisabled}
			label={getFieldLabel('single_message')}
			name={`${PREFIX}.single_message`}
			after={
				showWarning && (
					<>
						<Text>
							{isRTL() ? '👈' : '👉'}&nbsp;
							{createInterpolateElement(
								sprintf(
									/* translators: 1 - field name, 2 - value */
									__('When %1$s is set to %2$s:'),
									'<ImagePosition />',
									'<Value />'
								),
								{
									ImagePosition: <b>{getFieldLabel('image_position')}</b>,
									Value: <b>{__('After the Text')}</b>,
								}
							)}
						</Text>
						<List styleType='circle' ms='3em'>
							{parse_mode === 'none' && (
								<ListItem color='red.500'>
									{createInterpolateElement(
										sprintf(
											/* translators: 1 - field name, 2 - value */
											__('%1$s should not be %2$s.'),
											'<ParseMode />',
											'<Value />'
										),
										{ ParseMode: <b>{getFieldLabel('parse_mode')}</b>, Value: <b>{__('None')}</b> }
									)}
								</ListItem>
							)}
							{disable_preview && (
								<ListItem color='red.500'>
									{createInterpolateElement(
										sprintf(
											/* translators: 1 - field name */
											__('%s should not be enabled.'),
											'<DisablePreview />'
										),
										{
											DisablePreview: <b>{getFieldLabel('disable_web_page_preview')}</b>,
										}
									)}
								</ListItem>
							)}
						</List>
					</>
				)
			}
		/>
	);
};
