import { useFormContext } from 'react-hook-form';
import { path } from 'ramda';

import { strToPath } from '@wp-plugins/utilities';

import { FormFieldProps, FieldValue, FieldType } from '../types';
import { RenderField } from '../render';
import { useFieldConditions } from '../hooks';

export const Field = <FT extends FieldType, V extends FieldValue>(props: FormFieldProps<FT, V>): JSX.Element => {
	const { conditions, valueAsNumber, ...rest } = props as any;
	const { register, errors } = useFormContext();
	const conditionsApply = useFieldConditions(props.name, conditions);

	const fieldPath = strToPath(props.name);

	return (
		conditionsApply && (
			<RenderField
				fieldRef={register({ required: props.isRequired, valueAsNumber })}
				error={path(fieldPath, errors)}
				{...rest}
			/>
		)
	);
};
