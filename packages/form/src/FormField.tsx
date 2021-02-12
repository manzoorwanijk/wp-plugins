import React from 'react';

import { FormFieldProps, FieldValue, FieldType } from './types';
import { Field } from './fields';

export const FormField = <FT extends FieldType, V extends FieldValue>(props: FormFieldProps<FT, V>): JSX.Element => {
	const { fieldType } = props;

	if (!fieldType) {
		throw new Error('fieldType is required');
	}

	const { isRepeatable, ...rest } = props;

	if (isRepeatable) {
		return null; // <Repeatable {...rest} />;
	}

	/* if (fieldType === 'group') {
		return null; // <Group {...rest} />;
	} */

	return <Field {...(rest as FormFieldProps<FT, V>)} />;
};
