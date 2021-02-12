import { useCallback } from 'react';

import { SubmitHandler } from '@wp-plugins/form';
import { __ } from '@wp-plugins/i18n';
import { sleep } from '@wp-plugins/utilities';
import { useDisplayFeedback } from '@wp-plugins/services';

import { FormData } from './types';

export const useOnSubmit = (): SubmitHandler<FormData> => {
	const { displaySuccess } = useDisplayFeedback();

	return useCallback(
		async (data) => {
			await sleep(2000);
			console.log(data);
			displaySuccess({ title: __('Changes saved successfully.') });
		},
		[displaySuccess]
	);
};
