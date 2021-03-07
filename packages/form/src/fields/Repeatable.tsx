import { useFormContext } from 'react-hook-form';
import { path } from 'ramda';

import { strToPath } from '@wp-plugins/utilities';

import { FormFieldProps, FieldValue, FieldType } from '../types';
import { RenderRepeatable } from '../render';
import { useFieldConditions } from '../hooks';

export const Repeatable = <FT extends FieldType, V extends FieldValue>(props: FormFieldProps<FT, V>): JSX.Element => {
	const { conditions, name, ...rest } = props as any;

	const { errors } = useFormContext();
	const conditionsApply = useFieldConditions(props.name, conditions);
	const fieldPath = strToPath(props.name);

	return conditionsApply && <RenderRepeatable name={name} error={path(fieldPath, errors)} {...rest} />;
};
