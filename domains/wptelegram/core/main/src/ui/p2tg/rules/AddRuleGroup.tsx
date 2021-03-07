import { useCallback } from 'react';
import { pathOr } from 'ramda';

import { Button } from '@wp-plugins/adapters';
import { AddIcon } from '@wp-plugins/icons';
import { __ } from '@wp-plugins/i18n';
import { useFormContext } from '@wp-plugins/form';
import { strToPath } from '@wp-plugins/utilities';

import { DEFAULT_RULE } from '../constants';

interface AddRuleGroupProps {
	rulesArrayName: string;
}

export const AddRuleGroup: React.FC<AddRuleGroupProps> = ({ rulesArrayName }) => {
	const { getValues, setValue } = useFormContext();

	const onClick = useCallback(() => {
		const existingRules = pathOr([], strToPath(rulesArrayName), getValues());
		const newRules = [...existingRules, { value: [DEFAULT_RULE] }];

		setValue(rulesArrayName, newRules, { shouldDirty: true });
	}, [getValues, rulesArrayName, setValue]);

	return (
		<Button leftIcon={<AddIcon />} onClick={onClick}>
			{__('Add')}
		</Button>
	);
};
