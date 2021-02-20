import $ from 'jquery';
import { allPass, has, propIs, uniq } from 'ramda';

import { AnyObject } from '@wp-plugins/utilities';
import { setLocaleData } from '@wp-plugins/i18n';

import { Plugins } from './types';

const isFieldError = allPass([has('message'), has('type'), propIs(String, 'message'), propIs(String, 'type')]);

const errorsToStrList = (bucket: Array<string>, error: any) => {
	if (isFieldError(error)) {
		return [...bucket, error.message];
	}

	if ('object' === typeof error) {
		return Object.values(error).reduce(errorsToStrList, bucket);
	}
	return bucket;
};

export const getErrorStrings = (errors: AnyObject): Array<string> => {
	const strings = Object.values(errors || {}).reduce(errorsToStrList, []);
	return uniq(strings);
};

export const cleanup = (removeSiblingsOf = '', disableFormCSS = true) => {
	const id = removeSiblingsOf && removeSiblingsOf.replace(/^#?/, '#');
	$(() => {
		if (id && $(id).length) {
			$(id).siblings().remove();
		}
		if (disableFormCSS) {
			$('#forms-css').prop('disabled', true);
		}
	});
};

export const setI18nData = (plugin: keyof Plugins, domain: string) => {
	const i18nData = window[plugin].i18n;
	setLocaleData(i18nData, domain);
};
