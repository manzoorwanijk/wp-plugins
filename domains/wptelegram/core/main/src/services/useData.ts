import { usePluginData } from '@wp-plugins/services';
import { WPTelegramCoreData } from './types';

export const useData = <K extends keyof WPTelegramCoreData | undefined = undefined>(
	key?: K
): K extends undefined ? WPTelegramCoreData : WPTelegramCoreData[K] => {
	return usePluginData('wptelegram', key);
};
