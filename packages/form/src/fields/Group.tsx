import classNames from 'classnames';

import { Box } from '@wp-plugins/adapters';

import { FormFieldProps, FieldValue } from '../types';
import { Field } from './Field';
import { useFieldConditions } from '../hooks';

export const Group = <FT extends 'group', V extends FieldValue>(props: FormFieldProps<FT, V>): JSX.Element => {
	const { after, before, conditions, label, name: groupName, subFields } = props;

	const conditionsApply = useFieldConditions(groupName, conditions);

	if (subFields?.length && conditionsApply) {
		return (
			<div className='field-group-wrap'>
				<h5>{label}</h5>
				{before}
				<div className={classNames('field-group-items')}>
					{subFields.map(({ name: fieldname, fieldType, groupItemProps, ...props }, i) => {
						const name = `${groupName}.${fieldname}`;
						const className = classNames('field-group-item', groupItemProps?.className, fieldname);
						return (
							<Box {...groupItemProps} className={className} key={name + i}>
								<Field {...props} fieldType={fieldType} name={name} />
							</Box>
						);
					})}
				</div>
				{after}
			</div>
		);
	}
	return null;
};

export default Group;
