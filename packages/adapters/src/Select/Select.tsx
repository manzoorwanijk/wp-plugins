import { forwardRef } from 'react';
import { Select as ChakraSelect, SelectProps as ChakraSelectProps } from '@chakra-ui/react';

import { OptionsType } from '../types';

export interface SelectProps extends ChakraSelectProps {
	options?: OptionsType;
}

const rootProps = { maxW: 'max-content' };

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ options, children, ...selectProps }, ref) => {
	const childNodes: React.ReactNode = options?.map(
		({ label, options: optionGroups, value, ...optionProps }, index) => {
			if (optionGroups?.length && label) {
				return (
					<optgroup label={label as string} key={`${label}${index}`} {...optionProps}>
						{optionGroups.map(({ label: optLabel, value, ...optProps }, i) => (
							<option {...optProps} value={value} key={`${value}${i}`}>
								{optLabel}
							</option>
						))}
					</optgroup>
				);
			}
			return (
				<option {...optionProps} value={value} key={`${value}${index}`}>
					{label}
				</option>
			);
		}
	);

	return (
		<ChakraSelect rootProps={rootProps} ref={ref} {...selectProps}>
			{childNodes || children}
		</ChakraSelect>
	);
});
