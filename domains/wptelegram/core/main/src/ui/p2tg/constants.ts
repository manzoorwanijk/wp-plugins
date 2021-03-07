import { DataShape, Rule } from '../../services';

export const PREFIX: keyof DataShape = 'p2tg';

export const DEFAULT_RULE: Rule = {
	param: 'post',
	values: [],
	operator: 'in',
};
