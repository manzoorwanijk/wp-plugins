import { useCallback } from 'react';
import { assocPath } from 'ramda';

import { __ } from '@wp-plugins/i18n';
import { GetErrorMessage, strToPath } from '@wp-plugins/utilities';
import { SubmitHandler, UseFormMethods } from '@wp-plugins/form';

import { fetchAPI } from './apiFetch';
import { useDisplayFeedback } from './useDisplayFeedback';

type FormData = Record<string, any>;

interface SubmitFormProps<FD extends FormData> {
	displayFeedback?: boolean;
	form?: UseFormMethods<FD>;
	formatErrors?: (errors: any) => any;
	formatValues?: (values: any) => any;
	getErrorMessage: GetErrorMessage<Exclude<keyof FD, number | symbol>>;
	path: string; // WP REST API path
}

const defaultFormatCb = (v: any) => v;

export const useSubmitForm = <FD extends FormData>({
	displayFeedback = true,
	form,
	formatErrors = defaultFormatCb,
	formatValues = defaultFormatCb,
	getErrorMessage,
	path,
}: SubmitFormProps<FD>): SubmitHandler<FD> => {
	const { displaySuccess, displaySubmitErrors } = useDisplayFeedback();

	const submitForm = useCallback<SubmitHandler<FD>>(
		async (values) => {
			let result: any;
			try {
				const data = formatValues(values);
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
							const { message, param } = params[key];
							// if it's a nested object
							if (param && message) {
								const path = strToPath(param);
								errors = assocPath(path, message, errors);
							} else {
								errors = assocPath([key], getErrorMessage(key as any, 'invalid'), errors);
							}
						}
					} else if ('rest_missing_callback_param' === code) {
						data.params.forEach((key: any) => {
							errors[key] = getErrorMessage(key, 'required');
						});
					}
				}

				// if form is provided, set field errors
				if (form) {
					Object.keys(errors).forEach((key) => {
						form.setError(key as any, {
							type: 'server',
							message: errors[key],
						});
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
		[displayFeedback, displaySubmitErrors, displaySuccess, form, formatErrors, formatValues, getErrorMessage, path]
	);

	return submitForm;
};
