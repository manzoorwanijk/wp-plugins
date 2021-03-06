import { NumberInput, Select, Switch, Textarea, TextInput, MultiSelect } from '@wp-plugins/adapters';

import { RenderFieldProps, FieldType, FieldValue } from '../types';
import { AdapterPropsMap } from './types';
import { Radio } from './Radio';
import { MultiCheck } from './MultiCheck';
import { MultiSelectAsync } from './MultiSelectAsync';
import { TextWithButton } from './TextWithButton';
import { Hidden } from './Hidden';

export const adapterMap: {
	[K in FieldType]: React.ComponentType<AdapterPropsMap[K]>;
} = {
	group: null,
	hidden: Hidden,
	multicheck: MultiCheck,
	multiselect: MultiSelect,
	'multiselect.async': MultiSelectAsync,
	number: NumberInput,
	radio: Radio,
	select: Select,
	switch: Switch,
	text: TextInput,
	textarea: Textarea,
	'text.button': TextWithButton,
};

const DefaultComponent = () => null;

const nonRefTypes: Array<FieldType> = ['radio', 'multicheck', 'multiselect.async'];

export const Adapter = <FT extends FieldType, V extends FieldValue>(props: RenderFieldProps<FT, V>): JSX.Element => {
	const { fieldType, fieldRef, ...rest } = props as any;
	const Component = adapterMap?.[fieldType] || DefaultComponent;

	const ref = nonRefTypes.includes(fieldType) ? null : fieldRef;

	return <Component {...(rest as any)} ref={ref} />;
};
