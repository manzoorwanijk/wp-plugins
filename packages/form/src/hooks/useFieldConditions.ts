import { useMemo } from 'react';
import { pluck } from 'ramda';
import { useFormContext } from 'react-hook-form';

import { FieldConditions } from '../types';
import { evaluateFieldConditions } from '../utils';

export const useFieldConditions = (fieldName: string, conditions: FieldConditions) => {
	const { watch } = useFormContext();

	const fields = pluck('field', conditions || []);

	const formData = watch(fields);

	return useMemo<boolean>(() => evaluateFieldConditions(conditions, formData, fieldName), [
		conditions,
		fieldName,
		formData,
	]);
};
