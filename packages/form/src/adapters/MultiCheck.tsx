import { useCallback } from 'react';
import { Controller, ControllerRenderProps } from 'react-hook-form';

import { MultiCheck as MultiCheckAdapter, MultiCheckProps } from '@wp-plugins/adapters';

export const MultiCheck: React.FC<MultiCheckProps> = (props) => {
	const render = useCallback(
		({ onChange, value }: ControllerRenderProps) => (
			<MultiCheckAdapter {...props} onChange={onChange} value={value} />
		),
		[props]
	);
	return <Controller name={props.name} render={render} />;
};
