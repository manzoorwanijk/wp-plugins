import type { BaseAssetsData, BaseDOMData, BasePluginData } from '@wp-plugins/services';
import type { OptionsType } from '@wp-plugins/adapters';

export interface WPTelegramCommentsData extends BaseDOMData<AssetsData>, BasePluginData<FormData, UiData> {}

export interface AssetsData extends BaseAssetsData {
	tgIconUrl: string;
}

export interface UiData {
	post_types: OptionsType;
}

export interface FormData {
	attributes?: string;
	code: string;
	exclude?: string;
	post_types: Array<string>;
}
