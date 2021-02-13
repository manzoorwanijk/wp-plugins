import { __ } from '@wp-plugins/i18n';
import { Button } from '@wp-plugins/adapters';
import { useFormContext } from '@wp-plugins/form';

export const SubmitInfo: React.FC = () => {
	const { formState } = useFormContext();
	const { isDirty, isSubmitting } = formState;
	return (
		<Button type='submit' isLoading={isSubmitting} isDisabled={!isDirty}>
			{__('Submit')}
		</Button>
	);
};
