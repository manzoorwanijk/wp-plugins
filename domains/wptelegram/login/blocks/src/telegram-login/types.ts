import type { BaseAssetsData, BaseDOMData, BasePluginData } from '@wp-plugins/services';
import type { OptionsType } from '@wp-plugins/adapters';

export interface WPTelegramLoginData extends BaseDOMData<AssetsData>, BasePluginData<FormData, UiData> {}

export interface AssetsData extends BaseAssetsData {
	loginImageUrl: string;
	loginAvatarUrl: string;
}

export interface UiData {
	show_if_user_is: OptionsType;
}

export type TelegramLoginAtts = {
	button_style?: string;
	show_user_photo?: boolean;
	corner_radius?: string;
	show_if_user_is?: string;
};
