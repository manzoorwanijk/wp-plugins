import { usePluginData } from '@wp-plugins/services';
import { WPTelegramCommentsData } from './types';

export const useData = <K extends keyof WPTelegramCommentsData | undefined = undefined>(
	key?: K
): K extends undefined ? WPTelegramCommentsData : WPTelegramCommentsData[K] => {
	return usePluginData('wptelegram_comments', key);
};
