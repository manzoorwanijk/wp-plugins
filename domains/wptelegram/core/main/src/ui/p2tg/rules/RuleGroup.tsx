import { Fragment, useEffect } from 'react';

import { Box } from '@wp-plugins/adapters';
import { useFieldArray } from '@wp-plugins/form';

import { RuleSet } from './RuleSet';
import { And } from './And';
import { RuleGroup as RuleGroupType } from '../../../services';
import { RuleGroupProps } from './types';

export const RuleGroup: React.FC<RuleGroupProps> = ({ rulesArray, rulesArrayIndex, rulesArrayName }) => {
	const ruleGroupArrayName = `${rulesArrayName}[${rulesArrayIndex}].value`;

	const ruleGroupArray = useFieldArray<RuleGroupType>({ name: ruleGroupArrayName });

	useEffect(() => {
		if (!ruleGroupArray.fields.length) {
			rulesArray.remove(rulesArrayIndex);
		}
	}, [ruleGroupArray.fields.length, rulesArray, rulesArrayIndex]);

	const ruleCount = ruleGroupArray.fields.length;

	return (
		<Box className='rule-group' borderWidth='1px' p='0.5em'>
			{ruleGroupArray.fields.map((rule, index) => (
				<Fragment key={rule.id}>
					<Box>
						<RuleSet
							ruleGroupArray={ruleGroupArray}
							ruleGroupArrayIndex={index}
							ruleGroupArrayName={ruleGroupArrayName}
							rule={rule}
						/>
					</Box>
					{/* Do not show AND after last rule */}
					{index < ruleCount - 1 ? <And /> : null}
				</Fragment>
			))}
		</Box>
	);
};
