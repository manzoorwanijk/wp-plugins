import apiFetch, { APIFetchOptions } from '@wordpress/api-fetch';

import { __, sprintf } from '@wp-plugins/i18n';

export const fetchAPI = {
	GET: async <T>(options: APIFetchOptions) => {
		return await apiFetch<T>(options);
	},
	POST: async <T>(options: APIFetchOptions) => {
		return await apiFetch<T>({ method: 'POST', ...options });
	},
};

export const getErrorMessage = (error: any): string => {
	let result: string;
	if (error) {
		const {
			error_code, // From Telegram
			description,
			code, // From WP REST API
			message,
		} = error || {};

		const errorCode = error_code || code;
		const errorMessage = description || message;

		result = errorCode
			? isNaN(errorCode)
				? errorMessage
				: `${errorCode} (${errorMessage})`
			: __('Some error occured');
	} else {
		result = __('Could not connect');
	}

	return sprintf('%s %s', __('Error:'), result);
};

export type { APIFetchOptions };
