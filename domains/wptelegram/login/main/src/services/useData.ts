import { usePluginData } from '@wp-plugins/services';
import { WPTelegramLoginData } from './types';

export const useData = <K extends keyof WPTelegramLoginData | undefined = undefined>(
	key?: K
): K extends undefined ? WPTelegramLoginData : WPTelegramLoginData[K] => {
	return usePluginData('wptelegram_login', key);
};
