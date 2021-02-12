import { useFormContext } from 'react-hook-form';
import { DebugData } from '@wp-plugins/components';

export const FormDebug = () => {
	const { watch } = useFormContext();

	return <DebugData data={watch()} />;
};
