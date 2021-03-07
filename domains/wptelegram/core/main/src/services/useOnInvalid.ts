import { useCallback } from 'react';

import { SubmitErrorHandler } from '@wp-plugins/form';
import { useDisplayFeedback } from '@wp-plugins/services';

import { DataShape } from './types';

export const useOnInvalid = (): SubmitErrorHandler<DataShape> => {
	const { displayValidationErrors } = useDisplayFeedback();

	return useCallback((errors) => displayValidationErrors(errors), [displayValidationErrors]);
};
