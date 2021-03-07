import { useCallback } from 'react';

import { SubmitHandler, UseFormMethods } from '@wp-plugins/form';
import { useSubmitForm } from '@wp-plugins/services';

import { DataShape } from './types';
import { useData } from './useData';
import { getErrorMessage } from './fields';

export const useOnSubmit = (form: UseFormMethods<DataShape>): SubmitHandler<DataShape> => {
	const { rest_namespace } = useData('api');

	const path = `${rest_namespace}/settings`;

	const submitForm = useSubmitForm<DataShape>({ form, path, getErrorMessage } as any);

	return useCallback(async (data) => await submitForm(data), [submitForm]);
};
