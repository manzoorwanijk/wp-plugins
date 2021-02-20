import { forwardRef, useMemo } from 'react';
import { Checkbox, CheckboxGroup, CheckboxGroupProps, Stack, StackProps } from '@chakra-ui/react';

import { OptionsType } from '../types';

export interface MultiCheckProps extends CheckboxGroupProps {
	name?: string;
	options?: OptionsType;
	isInline?: boolean;
}

const dir: StackProps['direction'] = ['column', 'row'];

export const MultiCheck = forwardRef<HTMLInputElement, MultiCheckProps>(
	({ children, options, isInline, name, ...restProps }, ref) => {
		const childNodes = useMemo(() => {
			// make sure the value is array
			const fieldValue = restProps.value || [];
			return options?.map(({ label, value, ...rest }, index) => {
				return (
					<Checkbox
						value={value}
						{...rest}
						isChecked={fieldValue.includes(value)}
						name={`${name}[]`}
						key={`${value}${index}`}
						ref={ref}
					>
						{label}
					</Checkbox>
				);
			});
		}, [name, options, ref, restProps.value]);

		const direction = isInline ? dir : 'column';

		return (
			<CheckboxGroup {...restProps}>
				<Stack direction={direction} spacing='0.5em'>
					{childNodes || children}
				</Stack>
			</CheckboxGroup>
		);
	}
);
