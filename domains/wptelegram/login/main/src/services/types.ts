import type { BaseAssetsData, BaseDOMData, BasePluginData } from '@wp-plugins/services';
import type { OptionsType } from '@wp-plugins/adapters';

export interface WPTelegramLoginData extends BaseDOMData<AssetsData>, BasePluginData<FormData, UiData> {}

export interface AssetsData extends BaseAssetsData {
	tgIconUrl: string;
}

export interface UiData {
	show_if_user_is: OptionsType;
	user_role: OptionsType;
}

export interface FormData {
	avatar_meta_key?: string;
	bot_token: string;
	bot_username: string;
	button_style?: 'large' | 'medium' | 'small';
	corner_radius?: string;
	custom_error_message?: string;
	disable_signup?: boolean;
	hide_on_default?: boolean;
	random_email?: boolean;
	redirect_to?: 'default' | 'homepage' | 'current_page' | 'custom_url';
	redirect_url?: string;
	show_if_user_is?: string;
	show_message_on_error?: boolean;
	show_user_photo?: boolean;
	user_role?: string;
}

declare global {
	interface Window {
		wptelegram_login: WPTelegramLoginData;
	}
}
