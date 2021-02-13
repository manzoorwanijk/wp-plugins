import { PropsWithChildren } from 'react';
import { FormProvider, UseFormMethods } from 'react-hook-form';

import { AnyObject } from '@wp-plugins/utilities';

import './styles.scss';

export interface FormProps<FormValues extends AnyObject> extends React.FormHTMLAttributes<HTMLFormElement> {
	form: UseFormMethods<FormValues>;
}

export const Form = <FormValues extends AnyObject>({
	children,
	form,
	onSubmit,
	...rest
}: PropsWithChildren<FormProps<FormValues>>): JSX.Element => {
	return (
		<FormProvider {...form}>
			<form onSubmit={onSubmit} {...rest}>
				{children}
			</form>
		</FormProvider>
	);
};
