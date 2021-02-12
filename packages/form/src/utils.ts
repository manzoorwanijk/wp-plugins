import { path } from 'ramda';
import { AnyObject, strToPath } from '@wp-plugins/utilities';

import { FieldConditions, FieldValue } from './types';

/**
 * Parts of this function are copied from @eventespresso/form
 */
export const evaluateFieldConditions = (
	conditions: FieldConditions,
	formData: AnyObject,
	fieldName: string
): boolean => {
	/**
	 * The field can be inside a repeatable field/group.
	 * Thus fieldName can be "billing.addresses[1].phones[0].code"
	 * which means that it belongs to address at index 1 (in array of addresses)
	 * and phone at index 0 (in array of phones)
	 */
	const repeatableIndices = fieldName.match(/\[\d+?\]/g) || []; // ["[1]", "[0]"]

	const satisfied = conditions
		?.map(({ field, compare, value }) => {
			let complexKey: string = field;

			// field can be "billing.addresses[x].phones[x].country"
			const variableKeyRegex = /\[x\]/;
			if (variableKeyRegex.test(complexKey)) {
				repeatableIndices.forEach((entry) => {
					complexKey = complexKey.replace(variableKeyRegex, entry);
				});
				// replace any remaining variable indices with "0"
				complexKey = complexKey.replace(new RegExp(variableKeyRegex.source, 'g'), '[0]');
			}

			const result = path<FieldValue>(strToPath(complexKey), formData);

			switch (compare) {
				case '=':
					return result === value;
				case '!=':
					return result !== value;
				case '>':
					return result > value;
				case '>=':
					return result >= value;
				case '<':
					return result < value;
				case '<=':
					return result <= value;
				case 'EMPTY':
					return !result;
				case 'NOT_EMPTY':
					return result;
				case 'CONTAINS':
					return (typeof result === 'string' || Array.isArray(result)) && result.includes(value);
				case 'NOT_CONTAINS':
					return !(typeof result === 'string' || Array.isArray(result)) || !result.includes(value);
				case 'MATCHES':
					return new RegExp(value).test(`${result}`);
				case 'NOT_MATCHES':
					return !new RegExp(value).test(`${result}`);
				default:
					return false;
			}
		})
		?.filter(Boolean);

	// whether all conditions apply
	const conditionsApply = satisfied?.length === conditions?.length;

	return conditionsApply;
};
