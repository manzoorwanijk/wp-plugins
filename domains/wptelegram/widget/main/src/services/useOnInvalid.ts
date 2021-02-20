import { useCallback } from 'react';

import { SubmitErrorHandler } from '@wp-plugins/form';
import { useDisplayFeedback } from '@wp-plugins/services';

import { FormData } from './types';

export const useOnInvalid = (): SubmitErrorHandler<FormData> => {
	const { displayValidationErrors } = useDisplayFeedback();

	return useCallback((errors) => displayValidationErrors(errors), [displayValidationErrors]);
};
