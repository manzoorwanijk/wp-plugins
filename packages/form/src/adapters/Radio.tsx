import { useCallback } from 'react';
import { Controller, ControllerRenderProps } from 'react-hook-form';

import { Radio as RadioAdapter, RadioProps } from '@wp-plugins/adapters';

export const Radio: React.FC<RadioProps> = (props) => {
	const render = useCallback(
		({ onChange, onBlur, value, ref }: ControllerRenderProps) => (
			<RadioAdapter {...(props as any)} onChange={onChange} onBlur={onBlur} value={value} ref={ref} />
		),
		[props]
	);
	return <Controller name={props.name} render={render} />;
};
