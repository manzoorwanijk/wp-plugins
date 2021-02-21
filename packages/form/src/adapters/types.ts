import {
	TextInputProps,
	NumberInputProps,
	SelectProps,
	SwitchProps,
	MultiCheckProps,
	RadioProps,
} from '@wp-plugins/adapters';

export interface AdapterPropsMap {
	text: TextInputProps;
	'text.button': TextInputProps;
	number: NumberInputProps;
	select: SelectProps;
	switch: SwitchProps;
	multicheck: MultiCheckProps;
	radio: RadioProps;
}
