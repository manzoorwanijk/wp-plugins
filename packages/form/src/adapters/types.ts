import {
	BoxProps,
	MultiCheckProps,
	NumberInputProps,
	RadioProps,
	MultiSelectAsyncProps,
	MultiSelectProps,
	SelectProps,
	SwitchProps,
	TextInputProps,
	TextareaProps,
} from '@wp-plugins/adapters';
import { HiddenProps } from './Hidden';

export interface AdapterPropsMap {
	group: BoxProps;
	hidden: HiddenProps;
	multicheck: MultiCheckProps;
	multiselect: MultiSelectProps;
	'multiselect.async': MultiSelectAsyncProps;
	number: NumberInputProps;
	radio: RadioProps;
	select: SelectProps;
	switch: SwitchProps;
	text: TextInputProps;
	textarea: TextareaProps;
	'text.button': TextInputProps;
}
