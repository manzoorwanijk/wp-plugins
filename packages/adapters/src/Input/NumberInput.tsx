import { forwardRef } from 'react';
import {
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput as ChakraNumberInput,
	NumberInputProps,
	NumberInputField,
	NumberInputStepper,
} from '@chakra-ui/react';

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>((props, ref) => {
	return (
		<ChakraNumberInput {...props}>
			<NumberInputField ref={ref} />
			<NumberInputStepper>
				<NumberIncrementStepper />
				<NumberDecrementStepper />
			</NumberInputStepper>
		</ChakraNumberInput>
	);
});
