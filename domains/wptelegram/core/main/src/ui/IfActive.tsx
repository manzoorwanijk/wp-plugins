import { useFormContext } from '@wp-plugins/form';
import { Collapse } from '@wp-plugins/adapters';

import { DataShape } from '../services';

export const IfActive: React.FC<{ name: string }> = ({ children, name }) => {
	const { watch } = useFormContext<DataShape>();
	const active = watch<string, boolean>(name);

	return (
		<Collapse in={active} animateOpacity>
			{children}
		</Collapse>
	);
};
