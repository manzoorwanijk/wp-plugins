import { usePluginData } from '@wp-plugins/services';
import { WPTelegramWidgetData } from './types';

export const useData = <K extends keyof WPTelegramWidgetData | undefined = undefined>(
	key?: K
): K extends undefined ? WPTelegramWidgetData : WPTelegramWidgetData[K] => {
	return usePluginData('wptelegram_widget', key);
};
