import { useCallback } from 'react';

import { OptionsType } from '@wp-plugins/adapters';
import { BaseApiUtilArgs, fetchAPI } from '@wp-plugins/services';
import { useData } from './useData';

interface FetchRuleValuesArgs extends BaseApiUtilArgs {
	param: string;
	search?: string;
}

export type FetchRuleValues = (args: FetchRuleValuesArgs) => Promise<OptionsType>;

export const useFetchRuleValues = () => {
	const { rest_namespace } = useData('api');

	const path = `${rest_namespace}/p2tg-rules`;

	return useCallback(
		async (args) => {
			const { setInProgress, setResult, ...params } = args;

			setInProgress(true);

			try {
				// convert params to URL query string
				const urlParams = new URLSearchParams(params);
				const pathWithParams = `${path}?${urlParams.toString()}`;

				const result = await fetchAPI.GET<OptionsType>({ path: pathWithParams });

				setResult(result);

				return result;
			} catch (error) {
				console.log('ERROR', error);

				setResult([]);

				return [];
			} finally {
				setInProgress(false);
			}
		},
		[path]
	);
};
