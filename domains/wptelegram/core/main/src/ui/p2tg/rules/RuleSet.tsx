import { useCallback } from 'react';

import { __ } from '@wp-plugins/i18n';
import { AddIcon, CloseIcon } from '@wp-plugins/icons';
import { Flex, Box, IconButton } from '@wp-plugins/adapters';
import { FormField } from '@wp-plugins/form';

import { useData } from '../../../services';
import { DEFAULT_RULE } from '../constants';
import { RuleSetProps } from './types';
import { RuleSetValues } from './RuleSetValues';

const operator_options = [
	{
		value: 'in',
		label: __('is in'),
	},
	{
		value: 'not_in',
		label: __('is not in'),
	},
];

const styles = { borderWidth: '1px', p: '0.2em' };

export const RuleSet: React.FC<RuleSetProps> = (props) => {
	const { ruleGroupArray, ruleGroupArrayName, ruleGroupArrayIndex, rule } = props;

	const { rule_types } = useData('uiData');

	const onAdd = useCallback(() => {
		ruleGroupArray.insert(ruleGroupArrayIndex + 1, DEFAULT_RULE);
	}, [ruleGroupArray, ruleGroupArrayIndex]);

	const onRemove = useCallback(() => {
		ruleGroupArray.remove(ruleGroupArrayIndex);
	}, [ruleGroupArray, ruleGroupArrayIndex]);

	const ruleSetName = `${ruleGroupArrayName}[${ruleGroupArrayIndex}]`;

	return (
		<Flex className='rule-set' {...(ruleGroupArray.fields.length > 1 && styles)} alignItems='center'>
			<Flex width='100%' className='input-group'>
				<FormField
					name={`${ruleSetName}.param`}
					defaultValue={rule.param}
					fieldType='select'
					options={rule_types}
					controlClassName='param'
				/>
				<FormField
					name={`${ruleSetName}.operator`}
					defaultValue={rule.operator}
					fieldType='select'
					options={operator_options}
					controlClassName='operator'
					maxWidth='200px'
				/>
				<RuleSetValues ruleSetName={ruleSetName} {...props} />
			</Flex>
			<Flex className='action-buttons' alignItems='center'>
				<Box className='add-rule' pl='0.5em'>
					<IconButton
						aria-label={__('Add')}
						icon={<AddIcon />}
						onClick={onAdd}
						title={__('Add')}
						variant='outline'
					/>
				</Box>
				<Box className='remove-rule' pl='0.5em'>
					<IconButton
						aria-label={__('Remove')}
						icon={<CloseIcon />}
						onClick={onRemove}
						title={__('Remove')}
						variant='outline'
					/>
				</Box>
			</Flex>
		</Flex>
	);
};
