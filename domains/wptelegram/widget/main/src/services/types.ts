import type { BaseAssetsData, BaseDOMData, BasePluginData } from '@wp-plugins/services';
import type { OptionsType } from '@wp-plugins/adapters';

export interface WPTelegramWidgetData extends BaseDOMData<AssetsData>, BasePluginData<FormData, UiData> {}

export interface AssetsData extends BaseAssetsData {
	tgIconUrl: string;
	pullUpdatesUrl: string;
}

export interface UiData {
	post_types: OptionsType;
}

export interface AjaxWidgetFields {
	height?: string;
	username?: string;
	width?: string;
}

export interface LegacyWidgetFields extends Partial<AjaxWidgetFields> {
	author_photo?: 'auto' | 'always_show' | 'always_hide';
	bot_token?: string;
	num_messages?: number;
}

export interface JoinLinkFields {
	position?: 'before_content' | 'after_content';
	post_types?: Array<string>;
	priority?: string;
	text?: string;
	url?: string;
}

export interface AdvancedFields {
	telegram_blocked?: boolean;
	google_script_url?: string;
}

export interface FormData {
	ajax_widget: AjaxWidgetFields;
	join_link: JoinLinkFields;
	legacy_widget: LegacyWidgetFields;
	advanced: AdvancedFields;
}
