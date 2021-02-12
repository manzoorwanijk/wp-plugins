import { useMemo } from 'react';
import { Checkbox, CheckboxGroup, CheckboxGroupProps, Stack } from '@chakra-ui/react';

import { OptionsType } from '../types';

export interface MultiCheckProps extends CheckboxGroupProps {
	options?: OptionsType;
	isInline?: boolean;
}

export const MultiCheck: React.FC<MultiCheckProps> = ({ children, options, isInline, ...restProps }) => {
	const childNodes = options.map(({ label, value, ...rest }, index) => {
		return (
			<Checkbox value={value} {...rest} key={`${value}${index}`}>
				{label}
			</Checkbox>
		);
	});

	// make sure the value is array
	const value = useMemo(() => restProps.value || [], [restProps.value]);

	const direction = isInline ? 'row' : 'column';

	return (
		<CheckboxGroup {...restProps} value={value}>
			<Stack direction={direction} spacing='0.5em'>
				{childNodes || children}
			</Stack>
		</CheckboxGroup>
	);
};
