import { __, sprintf } from '@wp-plugins/i18n';

import { FORM_ERROR } from './constants';

export const fieldLabelGetter = <Fields extends string>(fieldLabels: FieldLabels<Fields>) => (name: Fields): string => {
	const { [name]: label } = fieldLabels;
	return label?.();
};

export type FieldLabels<K extends string> = {
	[key in K]: () => string;
};

export type GetErrorMessage<Fields extends string> = (
	fieldName: Fields,
	errorType?: 'invalid' | 'required'
) => string | Record<string, string>;

export const getFormErrorMessage = <Fields extends string>(
	fieldLabels: FieldLabels<Fields>
): GetErrorMessage<Fields> => {
	const getFieldLabel = fieldLabelGetter(fieldLabels);

	const callback: GetErrorMessage<Fields> = (fieldName, errorType = 'invalid') => {
		let message: string;

		switch (errorType) {
			case 'invalid':
				message = __('Invalid %s');
				break;
			case 'required':
				message = __('%s required.');
				break;
			default:
				return { [FORM_ERROR]: __('Changes could not be saved.') };
		}

		return sprintf(message, getFieldLabel(fieldName));
	};

	return callback;
};
