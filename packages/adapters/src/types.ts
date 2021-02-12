export interface OptionProps {
	value?: React.ReactText;
	label?: React.ReactNode;
	options?: Array<Omit<OptionProps, 'options'>>; // for optgroup
	[key: string]: any;
}

export type OptionsType = Array<OptionProps>;
