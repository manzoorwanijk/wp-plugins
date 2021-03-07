import type { UseFieldArrayMethods } from '@wp-plugins/form';

import { Rule, Rules, RuleGroup } from '../../../services';

export interface RuleGroupProps {
	rulesArray: UseFieldArrayMethods<Rules>;
	rulesArrayIndex: number;
	rulesArrayName: string;
}

export interface RuleSetProps {
	rule: Rule;
	ruleGroupArray: UseFieldArrayMethods<RuleGroup>;
	ruleGroupArrayName: string;
	ruleGroupArrayIndex: number;
}
