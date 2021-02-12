import { forwardRef } from 'react';
import { Input, InputProps, InputGroup, InputLeftAddon, InputAddonProps, InputRightAddon } from '@chakra-ui/react';

export interface TextInputProps extends InputProps {
	addonBefore?: React.ReactNode;
	addonAfter?: React.ReactNode;
	addonBeforeProps?: InputAddonProps;
	addonAfterProps?: InputAddonProps;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
	({ addonBefore, addonAfter, addonBeforeProps, addonAfterProps, ...rest }, ref) => {
		return (
			<InputGroup>
				{addonBefore && <InputLeftAddon {...addonBeforeProps}>{addonBefore}</InputLeftAddon>}
				<Input {...rest} ref={ref} />
				{addonAfter && <InputRightAddon {...addonAfterProps}>{addonAfter}</InputRightAddon>}
			</InputGroup>
		);
	}
);
