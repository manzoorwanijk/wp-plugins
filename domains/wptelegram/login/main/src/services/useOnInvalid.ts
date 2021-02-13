import { useCallback } from 'react';
import { map, prop } from 'ramda';

import { SubmitErrorHandler } from '@wp-plugins/form';
import { useDisplayFeedback } from '@wp-plugins/services';

import { FormData } from './types';

export const useOnInvalid = (): SubmitErrorHandler<FormData> => {
	const { displayValidationErrors } = useDisplayFeedback();

	return useCallback(
		async (errors) => {
			displayValidationErrors(map<any, any>(prop('message'), errors));
		},
		[displayValidationErrors]
	);
};
