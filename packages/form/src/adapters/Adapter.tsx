import { NumberInput, Select, Switch, TextInput } from '@wp-plugins/adapters';

import { RenderFieldProps, FieldType, FieldValue } from '../types';
import { AdapterPropsMap } from './types';
import { Radio } from './Radio';
import { MultiCheck } from './MultiCheck';
import { TextWithButton } from './TextWithButton';

export const adapterMap: {
	[K in FieldType]: React.ComponentType<AdapterPropsMap[K]>;
} = {
	text: TextInput,
	'text.button': TextWithButton,
	number: NumberInput,
	select: Select,
	switch: Switch,
	multicheck: MultiCheck,
	radio: Radio,
};

const DefaultComponent = () => null;

const nonRefTypes: Array<FieldType> = ['radio', 'multicheck'];

export const Adapter = <FT extends FieldType, V extends FieldValue>(props: RenderFieldProps<FT, V>): JSX.Element => {
	const { fieldType, fieldRef, ...rest } = props as any;
	const Component = adapterMap?.[fieldType] || DefaultComponent;

	const ref = nonRefTypes.includes(fieldType) ? null : fieldRef;

	return <Component {...(rest as any)} ref={ref} />;
};
