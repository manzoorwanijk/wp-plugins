import { useMemo } from 'react';
import { pluck } from 'ramda';
import { useFormContext } from 'react-hook-form';

import { FieldConditions } from '../types';
import { evaluateFieldConditions, computeVariablePath } from '../utils';

export const useFieldConditions = (fieldName: string, conditions: FieldConditions) => {
	const { watch } = useFormContext();

	const fields = useMemo(() => {
		const getComplexKey = computeVariablePath(fieldName);
		return pluck('field', conditions || []).map(getComplexKey);
	}, [conditions, fieldName]);

	const formData = watch(fields);

	return useMemo<boolean>(() => evaluateFieldConditions(conditions, formData, fieldName), [
		conditions,
		fieldName,
		formData,
	]);
};
