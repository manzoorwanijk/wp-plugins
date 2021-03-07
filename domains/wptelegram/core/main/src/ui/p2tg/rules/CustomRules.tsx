import { Box, Text } from '@wp-plugins/adapters';
import { useFieldArray } from '@wp-plugins/form';
import { __ } from '@wp-plugins/i18n';

import { AddRuleGroup } from './AddRuleGroup';
import { RuleGroup } from './RuleGroup';
import { Or } from './Or';
import { PREFIX } from '../constants';
import { Rules } from '../../../services';

const styles = { p: '0.5em', borderWidth: '1px' };

const rulesArrayName = `${PREFIX}.rules`;

export const CustomRules: React.FC = () => {
	const rulesArray = useFieldArray<Rules>({ name: rulesArrayName });

	// padding and border only if there is more than one rule group
	const props = rulesArray.fields?.length > 1 ? styles : null;

	return (
		<Box className='custom-rules' {...props}>
			{rulesArray.fields.map((ruleGroup, index) => {
				return (
					<Box key={ruleGroup.id}>
						<RuleGroup rulesArray={rulesArray} rulesArrayIndex={index} rulesArrayName={rulesArrayName} />
						<Or />
					</Box>
				);
			})}
			<Box textAlign='center' mt='1em'>
				{!rulesArray.fields?.length && (
					<Text mb='1em'>{__('You can also define custom rules to send the posts.')}</Text>
				)}
				<AddRuleGroup rulesArrayName={rulesArrayName} />
			</Box>
		</Box>
	);
};
