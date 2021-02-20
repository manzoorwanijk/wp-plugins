import { __ } from '@wp-plugins/i18n';
import { WidgetInfo } from '@wp-plugins/components';
import { useData } from '../../services';

export const AjaxWidgetInfo = () => {
	const { admin_url } = useData('api');

	return (
		<WidgetInfo
			adminUrl={admin_url}
			phpCode={`if ( function_exists( 'wptelegram_ajax_widget' ) ) {\n\twptelegram_ajax_widget();\n}`}
			title={__('WP Telegram Ajax Widget')}
			shortcode1='[wptelegram-ajax-widget widget_width="100%" widget_height="500"]'
			shortcode2='[wptelegram-ajax-widget widget_width="98%" widget_height="700"]'
		/>
	);
};
