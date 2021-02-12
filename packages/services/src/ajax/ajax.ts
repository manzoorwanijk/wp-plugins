import $ from 'jquery';
import { __ } from '@wordpress/i18n';

export const sendAjaxRequest = (options: JQuery.AjaxSettings): JQuery.jqXHR => {
	const defaults = {
		type: 'POST',
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		global: false, // Avoid the mess created by Wordfence. https://wordpress.org/support/topic/wordfence-corrupts-json-response-from-jquery-ajax-if-not-200/
	};

	const settings: JQuery.AjaxSettings = { ...defaults, ...options };
	const { crossDomain } = settings;

	if (!crossDomain) {
		// set WP Nonce Header
		settings.beforeSend = (xhr: JQuery.jqXHR): void => {
			xhr.setRequestHeader('X-WP-Nonce', window['X-WP-Nonce']);
		};
	}

	return $.ajax(settings);
};

export const getErrorResultFromXHR = (jqXHR: JQuery.jqXHR): string => {
	let result: string;
	if (jqXHR.responseText) {
		const {
			error_code, // From Telegram
			description,
			code, // From WP REST API
			message,
		} = JSON.parse(jqXHR.responseText);

		if (error_code) {
			result = `${error_code} (${description})`;
		} else if (code) {
			result = `${code} (${message})`;
		} else {
			result = __('Some error occured');
		}
	} else {
		result = __('Could not connect');
	}

	return result;
};
