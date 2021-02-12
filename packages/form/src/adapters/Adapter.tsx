import { MultiCheck, NumberInput, Select, Switch, TextInput } from '@wp-plugins/adapters';

import { RenderFieldProps, FieldType, FieldValue } from '../types';
import { AdapterPropsMap } from './types';
import { Radio } from './Radio';

export const adapterMap: {
	[K in FieldType]: React.ComponentType<AdapterPropsMap[K]>;
} = {
	text: TextInput,
	number: NumberInput,
	select: Select,
	switch: Switch,
	multicheck: MultiCheck,
	radio: Radio,
};

const DefaultComponent = () => null;

const nonRefTypes: Array<FieldType> = ['radio'];

export const Adapter = <FT extends FieldType, V extends FieldValue>(props: RenderFieldProps<FT, V>): JSX.Element => {
	const { fieldType, fieldRef, ...rest } = props;
	const Component = adapterMap?.[fieldType] || DefaultComponent;

	const ref = nonRefTypes.includes(fieldType) ? null : fieldRef;

	return <Component {...(rest as any)} ref={ref} />;
};