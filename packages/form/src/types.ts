import { OptionsType, ButtonProps } from '@wp-plugins/adapters';
import { AdapterPropsMap } from './adapters';

export type FieldType = keyof AdapterPropsMap;

export type FieldValue = string | number | readonly string[];

export type FormFieldProps<FT extends FieldType, V extends FieldValue> = Omit<AdapterPropsMap[FT], 'onChange'> & {
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
	isRepeatable?: boolean;
	isRequired?: boolean;
	valueAsNumber?: boolean;
	label?: React.ReactNode;
	name: string;
	options?: OptionsType;
} & (FT extends 'text.button' ? { button?: React.ComponentType<ButtonProps> } : unknown);

export type RenderFieldProps<FT extends FieldType, V extends FieldValue> = FormFieldProps<FT, V> & {
	error?: string;
	fieldRef: any;
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
