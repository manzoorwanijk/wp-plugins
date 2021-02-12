import { PluginHeader } from '@wp-plugins/components';
import { useData } from '../services';

export const Header = () => {
	const {
		pluginInfo: { title, version, description },
		assets: { logoUrl },
	} = useData();

	return <PluginHeader title={title} version={version} description={description} logoUrl={logoUrl} />;
};
