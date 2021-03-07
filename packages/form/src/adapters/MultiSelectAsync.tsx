import { useCallback } from 'react';
import { Controller, ControllerRenderProps } from 'react-hook-form';

import { MultiSelectAsync as MultiSelectAsyncAdapter, MultiSelectAsyncProps } from '@wp-plugins/adapters';

const DEFAULT_VALUE = [];

export const MultiSelectAsync: React.FC<MultiSelectAsyncProps> = (props) => {
	const render = useCallback(
		({ onChange, onBlur, value }: ControllerRenderProps) => (
			<MultiSelectAsyncAdapter
				{...props}
				onChange={onChange}
				onBlur={onBlur}
				isMulti
				value={value || DEFAULT_VALUE}
			/>
		),
		[props]
	);

	return <Controller name={props.name} render={render} defaultValue={props.defaultValue} />;
};
