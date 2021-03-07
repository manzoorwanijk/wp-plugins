import { forwardRef, useMemo } from 'react';
import {
	Radio as CharaRadio,
	RadioGroup,
	RadioGroupProps as ChakraRadioProps,
	Stack,
	StackProps,
} from '@chakra-ui/react';

import { OptionsType } from '../types';

export interface RadioProps extends Partial<ChakraRadioProps> {
	options?: OptionsType;
	isInline?: boolean;
}

const dir: StackProps['direction'] = ['column', 'row'];

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
	({ children, options, isInline, name, ...restProps }, ref) => {
		const childNodes = useMemo(() => {
			return options?.map(({ label, value, ...rest }, index) => {
				const key = `${name}-${value}-${index}`;
				return (
					<CharaRadio id={key} {...rest} value={value} key={key}>
						{label}
					</CharaRadio>
				);
			});
		}, [name, options]);

		const direction = isInline ? dir : 'column';

		return (
			<RadioGroup {...restProps} name={name} ref={ref}>
				<Stack direction={direction} spacing='1em'>
					{childNodes || children}
				</Stack>
			</RadioGroup>
		);
	}
);
