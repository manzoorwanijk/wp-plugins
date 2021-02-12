import { PropsWithChildren } from 'react';
import { useForm, FormProvider, DefaultValues, UseFormOptions, SubmitHandler } from 'react-hook-form';

import { AnyObject } from '@wp-plugins/utilities';

import './styles.scss';

export interface FormProps<FormValues extends AnyObject>
	extends Pick<UseFormOptions, 'defaultValues' | 'resolver'>,
		Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
	defaultValues?: DefaultValues<FormValues>;
	onSubmit: SubmitHandler<FormValues>;
}

export const Form = <FormValues extends AnyObject>({
	defaultValues,
	children,
	onSubmit,
	resolver,
	...rest
}: PropsWithChildren<FormProps<FormValues>>): JSX.Element => {
	const methods = useForm({ defaultValues, resolver });
	const { handleSubmit } = methods;

	return (
		<FormProvider {...methods}>
			<form onSubmit={handleSubmit(onSubmit)} {...rest}>
				{children}
			</form>
		</FormProvider>
	);
};
