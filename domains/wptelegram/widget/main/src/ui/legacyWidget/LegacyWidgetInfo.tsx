import { __ } from '@wp-plugins/i18n';
import { WidgetInfo } from '@wp-plugins/components';
import { useData } from '../../services';

export const LegacyWidgetInfo = () => {
	const { admin_url } = useData('api');

	return (
		<WidgetInfo
			adminUrl={admin_url}
			phpCode={`if ( function_exists( 'wptelegram_widget' ) ) {\n\t$args = array(\n\t\t// 'num_messages' => 5,\n\t\t// 'widget_width' => 100,\n\t\t// 'author_photo' => 'auto',\n\t);\n\n\twptelegram_widget( $args );\n}`}
			title={__('WP Telegram Legacy Widget')}
			shortcode1='[wptelegram-widget num_messages="5" widget_width="100" author_photo="always_hide"]'
			shortcode2='[wptelegram-widget author_photo="always_show"]'
		/>
	);
};
