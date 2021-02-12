import { __ } from '@wp-plugins/i18n';
import { Button } from '@wp-plugins/adapters';
import { useFormContext } from '@wp-plugins/form';

import { FORM_ID } from '../constants';

export const SubmitInfo: React.FC = () => {
	const { formState } = useFormContext();
	const { isDirty, isSubmitting } = formState;
	return (
		<Button type='submit' form={FORM_ID} isLoading={isSubmitting} isDisabled={!isDirty}>
			{__('Submit')}
		</Button>
	);
};
