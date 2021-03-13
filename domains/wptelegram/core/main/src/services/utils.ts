import { assocPath, objOf, pathOr, prop } from 'ramda';

import { DataShape } from './types';

export const processData = (predicate: any) => (data: DataShape): DataShape => {
	// adjust `value` prop in repeatable fields
	const p2tgChannelsPath = ['p2tg', 'channels'];
	const p2tgChannels = pathOr([], p2tgChannelsPath, data).map(predicate);
	let normalizedData = assocPath(p2tgChannelsPath, p2tgChannels, data);

	const p2tgRulesPath = ['p2tg', 'rules'];
	const p2tgRules = pathOr([], p2tgRulesPath, normalizedData).map(predicate);
	normalizedData = assocPath(p2tgRulesPath, p2tgRules, normalizedData);

	const notifyChatsPath = ['notify', 'chat_ids'];
	const notifyChats = pathOr([], notifyChatsPath, normalizedData).map(predicate);
	normalizedData = assocPath(notifyChatsPath, notifyChats, normalizedData);

	return normalizedData;
};

/**
 * Prepare default values from REST API schema
 */
export const prepDefaultValues = processData(objOf('value'));

/**
 * Normalizes form data for submission as per the REST schema
 */
export const normalizeData = processData(prop('value'));
