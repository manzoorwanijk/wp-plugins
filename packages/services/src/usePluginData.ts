import { Plugins, BaseDOMData } from './types';

export const usePluginData = <PluginData extends BaseDOMData, K extends keyof PluginData | undefined>(
	plugin: keyof Plugins,
	dataKey?: K
): K extends undefined ? PluginData : PluginData[K] => {
	return dataKey ? window[plugin]?.[dataKey] : window[plugin];
};
