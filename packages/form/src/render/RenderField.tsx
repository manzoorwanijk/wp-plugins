import classNames from 'classnames';
import { ErrorMessage } from '@hookform/error-message';

import { Box, FormControl, FormHelperText, FormLabel, Tooltip } from '@wp-plugins/adapters';
import { InfoOutlineIcon } from '@wp-plugins/icons';

import { RenderFieldProps, FieldValue, FieldType } from '../types';
import { Adapter } from '../adapters';
import { RenderErrorMessage } from './RenderErrorMessage';

export const RenderField = <FT extends FieldType, V extends FieldValue>(
	props: RenderFieldProps<FT, V>
): JSX.Element => {
	const {
		after,
		before,
		controlClassName,
		description,
		error,
		fieldRef,
		fieldType,
		id,
		info,
		isRequired,
		label,
		name,
		...rest
	} = props as any;

	const className = classNames('form-control', `form-control-${fieldType}`, controlClassName);

	const tooltipKey = info ? name + '-tooltip' : null;

	const fieldId = id || name;

	// no layout stuff needed for hidden field
	if (fieldType === 'hidden') {
		return <Adapter fieldType={fieldType} fieldRef={fieldRef} id={fieldId} name={name} {...rest} />;
	}

	return (
		<FormControl
			className={className}
			isDisabled={rest.isDisabled}
			isInvalid={Boolean(error)}
			isRequired={isRequired}
		>
			{label ? (
				<FormLabel htmlFor={fieldId} className='form-control__label' alignSelf='flex-start' pb='1em'>
					{label}
					{info && (
						<Tooltip placement='top-end' label={info} aria-label={info}>
							<InfoOutlineIcon ml='0.5em' />
						</Tooltip>
					)}
				</FormLabel>
			) : null}
			<Box className='form-control__input'>
				{before}
				<Adapter
					aria-label={label as string}
					aria-describedby={tooltipKey}
					fieldRef={fieldRef}
					fieldType={fieldType}
					id={fieldId}
					name={name}
					{...(rest as RenderFieldProps<FT, V>)}
				/>
				<ErrorMessage name={name} render={RenderErrorMessage} />
				{description ? <FormHelperText>{description}</FormHelperText> : null}
				{after}
			</Box>
		</FormControl>
	);
};
