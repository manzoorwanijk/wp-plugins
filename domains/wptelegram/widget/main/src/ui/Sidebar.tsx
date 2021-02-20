import { Box } from '@wp-plugins/adapters';
import { PluginInfoCard, WPTGSocialIcons } from '@wp-plugins/components';
import { __ } from '@wp-plugins/i18n';
import { FormDebug } from '@wp-plugins/form';

import { useData } from '../services';

const Sidebar: React.FC = () => {
	const {
		pluginInfo: { title },
		assets: { tgIconUrl },
	} = useData();
	return (
		<Box>
			<PluginInfoCard
				description={__(
					'Display the Telegram Public Channel or Group Feed in a WordPress widget or anywhere you want using a shortcode.'
				)}
				helpText={__('Get LIVE support on Telegram')}
				reviewLink='https://wordpress.org/support/plugin/wptelegram-login/reviews/#new-post'
				supportLink='https://t.me/WPTelegramChat'
				supportLinkText='@WPTelegramChat'
				socialIcons={<WPTGSocialIcons tgIconUrl={tgIconUrl} />}
				title={title}
			/>
			<FormDebug />
		</Box>
	);
};

export default Sidebar;
