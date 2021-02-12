import React from 'react';
import { useFormContext } from 'react-hook-form';

import { FormFieldProps, FieldValue, FieldType } from '../types';
import { RenderField } from '../render';
import { useFieldConditions } from '../hooks';

export const Field = <FT extends FieldType, V extends FieldValue>({
	conditions,
	valueAsNumber,
	...props
}: FormFieldProps<FT, V>): JSX.Element => {
	const { register, errors } = useFormContext();
	const conditionsApply = useFieldConditions(props.name, conditions);

	return (
		conditionsApply && (
			<RenderField
				fieldRef={register({ required: props.isRequired, valueAsNumber })}
				error={errors?.[props.name]}
				{...(props as FormFieldProps<FT, V>)}
			/>
		)
	);
};
