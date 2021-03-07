import type { BaseAssetsData, BaseDOMData, BasePluginData } from '@wp-plugins/services';

export interface WPTelegramWidgetData extends BaseDOMData<AssetsData>, BasePluginData<{}, UiData> {}

export interface AssetsData extends BaseAssetsData {
	message_view_url: string;
}

export interface UiData {
	join_link_url?: string;
	join_link_text?: string;
}

export type AjaxWidgetAtts = {
	widget_height?: string;
	username?: string;
	widget_width?: string;
};

export interface LegacyWidgetAtts extends Partial<AjaxWidgetAtts> {
	author_photo?: 'auto' | 'always_show' | 'always_hide';
	num_messages?: number;
}

export type SinglePostAtts = {
	alignment?: string;
	iframe_src?: string;
	url?: string;
	userpic?: boolean;
};

export type JoinChannelAtts = {
	alignment?: string;
	text?: string;
	link?: string;
};

declare global {
	interface Window {
		wptelegram_widget: WPTelegramWidgetData;
	}
}
