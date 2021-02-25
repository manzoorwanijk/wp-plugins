import {
	MultiCheckProps,
	NumberInputProps,
	RadioProps,
	SelectProps,
	SwitchProps,
	TextInputProps,
	TextareaProps,
} from '@wp-plugins/adapters';
import { HiddenProps } from './Hidden';

export interface AdapterPropsMap {
	hidden: HiddenProps;
	multicheck: MultiCheckProps;
	number: NumberInputProps;
	radio: RadioProps;
	select: SelectProps;
	switch: SwitchProps;
	text: TextInputProps;
	textarea: TextareaProps;
	'text.button': TextInputProps;
}
