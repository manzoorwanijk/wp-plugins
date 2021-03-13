import { useCallback } from 'react';
import { last } from 'ramda';

import { __ } from '@wp-plugins/i18n';
import { GetErrorMessage, strToPath } from '@wp-plugins/utilities';
import { SubmitHandler, UseFormMethods } from '@wp-plugins/form';

import { fetchAPI } from './apiFetch';
import { useDisplayFeedback } from './useDisplayFeedback';

type DataShape = Record<string, any>;

interface SubmitFormProps<FD extends DataShape> {
	displayFeedback?: boolean;
	form?: UseFormMethods<FD>;
	formatErrors?: (errors: any) => any;
	normalizeData?: (values: any) => any;
	getErrorMessage: GetErrorMessage<Exclude<keyof FD, number | symbol>>;
	path: string; // WP REST API path
}

const defaultFormatCb = (v: any) => v;

export const useSubmitForm = <FD extends DataShape>({
	displayFeedback = true,
	form,
	formatErrors = defaultFormatCb,
	normalizeData = defaultFormatCb,
	getErrorMessage,
	path,
}: SubmitFormProps<FD>): SubmitHandler<FD> => {
	const { displaySuccess, displaySubmitErrors } = useDisplayFeedback();

	const submitForm = useCallback<SubmitHandler<FD>>(
		async (values) => {
			let result: any;
			try {
				const data = normalizeData(values);
				result = await fetchAPI.POST({ data, path });

				if (displayFeedback) {
					displaySuccess({ title: __('Changes saved successfully.') });
				}
			} catch (error) {
				console.log('ERROR', error);
				const { code, data } = error;
				let errors = {};

				if (code) {
					if ('rest_invalid_param' === code) {
						const { params = {} } = data;

						for (const key in params) {
							const path = strToPath(key);
							const error = {
								message: getErrorMessage(last(path) as any, 'invalid'),
								type: 'submit',
							};
							errors[key] = error;
						}
					} else if ('rest_missing_callback_param' === code) {
						data.params.forEach((key: any) => {
							const path = strToPath(key);
							const error = {
								message: getErrorMessage(last(path) as any, 'required'),
								type: 'submit',
							};
							errors[key] = error;
						});
					}
				}

				// if form is provided, set field errors
				if (form) {
					Object.entries(errors).forEach(([key, error]) => {
						form.setError(key as any, error);
					});
				}

				errors = Object.assign({}, formatErrors(errors), getErrorMessage(null, null));

				if (displayFeedback) {
					displaySubmitErrors(errors);
				}

				return errors;
			}
			return result;
		},
		[displayFeedback, displaySubmitErrors, displaySuccess, form, formatErrors, getErrorMessage, normalizeData, path]
	);

	return submitForm;
};
