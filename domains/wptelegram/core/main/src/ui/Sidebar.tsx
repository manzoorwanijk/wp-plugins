import { Box } from '@wp-plugins/adapters';
import { PluginInfoCard, WPTGSocialIcons } from '@wp-plugins/components';
import { __ } from '@wp-plugins/i18n';
import { isDev } from '@wp-plugins/utilities';
import { FormDebug } from '@wp-plugins/form';

import { useData } from '../services';
import { Upsell } from './Upsell';

const Sidebar: React.FC = () => {
	const {
		pluginInfo: { title },
		assets: { tgIconUrl },
	} = useData();
	return (
		<Box>
			<PluginInfoCard
				description={__(
					'Integrate your WordPress website perfectly with Telegram. Send posts automatically to Telegram when published or updated, whether to a Telegram Channel, Group or private chat, with full control. Get your email notifications on Telegram.'
				)}
				helpText={__('Get LIVE support on Telegram')}
				reviewLink='https://wordpress.org/support/plugin/wptelegram/reviews/#new-post'
				supportLink='https://t.me/WPTelegramChat'
				supportLinkText='@WPTelegramChat'
				socialIcons={<WPTGSocialIcons tgIconUrl={tgIconUrl} />}
				title={title}
				upsell={<Upsell breakLine location='sidebar' fontWeight='normal' />}
			/>
			{isDev && <FormDebug />}
		</Box>
	);
};

export default Sidebar;
