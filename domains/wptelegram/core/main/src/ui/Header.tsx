import { PluginHeader } from '@wp-plugins/components';
import { useData } from '../services';

export const Header = () => {
	const { pluginInfo, assets } = useData();

	return <PluginHeader pluginInfo={pluginInfo} assets={assets} />;
};
