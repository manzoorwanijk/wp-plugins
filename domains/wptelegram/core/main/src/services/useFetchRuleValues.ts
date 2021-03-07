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

	const path = `${rest_namespace}/rules`;

	return useCallback(
		async (args) => {
			const { setInProgress, setResult, ...data } = args;

			setInProgress(true);
			return await new Promise((resolve) => {
				setTimeout(() => {
					const result =
						args.param === 'post'
							? [{ label: 'Group', options: [{ value: 'test', label: 'Test' }] }]
							: [{ value: 'testc', label: 'Test Cat' }];
					resolve(result);
					setResult(result);
					setInProgress(false);
				}, 3000);
			});

			try {
				const result = await fetchAPI.GET<OptionsType>({ data, path });

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
