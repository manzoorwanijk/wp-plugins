import { ErrorMessage } from '@hookform/error-message';

import { FormErrorMessage } from '@wp-plugins/adapters';

export const RenderErrorMessage: React.ComponentProps<typeof ErrorMessage>['render'] = ({ message }) => {
	return <FormErrorMessage>{message}</FormErrorMessage>;
};
