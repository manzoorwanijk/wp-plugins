import { useFieldArray } from 'react-hook-form';

import { Text, FormControl, FormHelperText, FormLabel, IconButton, Flex, Button } from '@wp-plugins/adapters';
import { sprintf, __ } from '@wp-plugins/i18n';
import { AddIcon, CloseIcon } from '@wp-plugins/icons';
import { SectionCard } from '@wp-plugins/components';

import { RenderRepeatableProps, FieldValue, FieldType, RepeatableValue } from '../types';
import { FormField } from '../FormField';

const DEFAULT_ITEM = { value: undefined };

export const RenderRepeatable = <FT extends FieldType, V extends FieldValue>(
	props: RenderRepeatableProps<FT, V>
): JSX.Element => {
	const {
		addButtonLabel,
		defaultItem = DEFAULT_ITEM,
		description,
		error,
		fieldType,
		initialLabel,
		label,
		name,
		renderAsSection,
		repeatableItemLabel,
		...rest
	} = props;

	const fieldArray = useFieldArray<RepeatableValue<V>>({ name });

	let errorMessage: React.ReactNode;
	if (error) {
		console.log({ error });

		errorMessage = <Text color='tomato'>{error}</Text>;
	}

	return (
		<>
			<FormControl>
				<FormLabel>{label}</FormLabel>
				{description ? <FormHelperText>{description}</FormHelperText> : null}
			</FormControl>
			{errorMessage}
			{!fieldArray.fields.length ? (
				<Text fontWeight='bold' as='span'>
					{initialLabel}{' '}
				</Text>
			) : null}
			{fieldArray.fields.map((field, index) => {
				const title = repeatableItemLabel
					? repeatableItemLabel(index)
					: sprintf(__('Entry %d'), `${index + 1}`);

				const removeButton = (
					<IconButton
						aria-label='remove-item'
						icon={<CloseIcon />}
						isRound
						// eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
						onClick={() => fieldArray.remove(index)}
						size='sm'
						colorScheme='red'
						ml={!renderAsSection ? '0.5em' : null}
					/>
				);

				const fieldName = `${name}.${index}.value`;

				const formField = (
					<FormField defaultValue={field.value} name={fieldName} fieldType={fieldType} {...(rest as any)} />
				);

				return renderAsSection ? (
					<SectionCard title={title} key={field.id}>
						{formField}
					</SectionCard>
				) : (
					<Flex alignItems='center' key={field.id}>
						{formField} {removeButton}
					</Flex>
				);
			})}
			<Button
				mt='0.5em'
				className='add-item'
				// eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
				onClick={() => fieldArray.append(defaultItem)}
				leftIcon={<AddIcon />}
			>
				{addButtonLabel || __('Add')}
			</Button>
		</>
	);
};
