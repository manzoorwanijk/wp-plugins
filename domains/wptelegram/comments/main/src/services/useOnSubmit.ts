import { useCallback } from 'react';

import { SubmitHandler, UseFormMethods } from '@wp-plugins/form';
import { useSubmitForm } from '@wp-plugins/services';

import { FormData } from './types';
import { useData } from './useData';
import { getErrorMessage } from './fields';

export const useOnSubmit = (form: UseFormMethods<FormData>): SubmitHandler<FormData> => {
	const { rest_namespace } = useData('api');

	const path = `${rest_namespace}/settings`;

	const submitForm = useSubmitForm<FormData>({ form, path, getErrorMessage } as any);

	return useCallback(
		async (data) => {
			const attributes = data.attributes ? JSON.parse(data.attributes) : {};
			const newData = { ...data, attributes };

			return await submitForm(newData);
		},
		[submitForm]
	);
};
