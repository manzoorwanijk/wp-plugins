import { OptionsType, ButtonProps, BoxProps } from '@wp-plugins/adapters';
import { AdapterPropsMap } from './adapters';

export type FieldType = keyof AdapterPropsMap;

export type FieldValue = string | number | readonly string[];

export type CommonFieldProps<FT extends FieldType, V extends FieldValue> = {
	after?: React.ReactNode;
	before?: React.ReactNode;
	// className?: string;
	conditions?: FieldConditions;
	controlClassName?: string;
	defaultValue?: V;
	description?: React.ReactNode;
	fieldType: FT;
	// groupClassName?: string;
	id?: string;
	info?: string;
	isDisabled?: boolean;
	isRequired?: boolean;
	valueAsNumber?: boolean;
	label?: React.ReactNode;
	name: string;
	options?: OptionsType;
};

export type RepeatableValue<T> = { value?: T; id?: string };

export type RepeatableProps<FT extends FieldType, V extends FieldValue> = CommonFieldProps<FT, V> & {
	addButtonLabel?: string;
	afterRow?: React.ComponentType;
	defaultItem?: any;
	initialLabel?: React.ReactNode;
	isRepeatable: true;
	renderAsSection?: boolean;
	repeatableItemLabel?: (index: number) => string;
};

export type FormFieldProps<FT extends FieldType, V extends FieldValue> = Omit<AdapterPropsMap[FT], 'onChange'> &
	(CommonFieldProps<FT, V> | RepeatableProps<FT, V>) &
	(FT extends 'text.button' ? { button?: React.ComponentType<ButtonProps> } : unknown) &
	(FT extends 'group'
		? {
				groupClassName?: string;
				groupItemProps?: BoxProps;
				subFields?: FieldList<FT, V>;
		  }
		: unknown);

export type RenderFieldProps<FT extends FieldType, V extends FieldValue> = FormFieldProps<FT, V> & {
	error?: string;
	fieldRef: any;
};

export type RenderRepeatableProps<FT extends FieldType, V extends FieldValue> = RepeatableProps<FT, V> & {
	error?: string;
};

export interface FieldCondition {
	field: string;
	compare:
		| '='
		| '!='
		| '!='
		| '>'
		| '>='
		| '<'
		| '<='
		| 'EMPTY'
		| 'NOT_EMPTY'
		| 'CONTAINS'
		| 'NOT_CONTAINS'
		| 'MATCHES'
		| 'NOT_MATCHES';
	value?: any;
}

export type FieldConditions = Array<FieldCondition>;

type FieldList<FT extends FieldType, V extends FieldValue> = Array<FormFieldProps<FT, V>>;
