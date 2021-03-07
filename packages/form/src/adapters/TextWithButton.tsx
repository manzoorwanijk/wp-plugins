import { forwardRef } from 'react';
import { useWatch } from 'react-hook-form';

import { TextInput } from '@wp-plugins/adapters';

import { RenderFieldProps } from '../types';

const addonAfterProps = { px: '0' };

export const TextWithButton = forwardRef<HTMLInputElement, RenderFieldProps<'text.button', string>>(
	({ addonAfter, button: Button, error, name, ...rest }, ref) => {
		const value = useWatch<string>({ name });

		const newAddonAfter = Button ? <Button isDisabled={Boolean(error)} value={value} /> : addonAfter;

		return (
			<TextInput
				name={name}
				borderEnd='0'
				borderEndRadius='0'
				addonAfterProps={addonAfterProps}
				{...rest}
				addonAfter={newAddonAfter}
				ref={ref}
			/>
		);
	}
);
