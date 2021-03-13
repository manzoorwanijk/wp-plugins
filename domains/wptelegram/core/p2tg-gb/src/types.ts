import type { BaseDOMData, BasePluginData } from '@wp-plugins/services';

export type DataShape = {
	channels?: Array<string>;
	delay?: string;
	disable_notification?: boolean;
	files?: Record<string, string>;
	message_template?: string;
	override_switch?: boolean;
	send2tg?: boolean;
};
export type UiData = {
	allChannels?: Array<string>;
};

export type WithDataProps = {
	data: DataShape;
	updateField: <K extends keyof DataShape>(field: K) => (value: DataShape[K]) => void;
};

export interface WPTelegramGBData extends BaseDOMData, BasePluginData<DataShape, UiData> {}

declare global {
	interface Window {
		wptelegram: WPTelegramGBData;
	}
}
