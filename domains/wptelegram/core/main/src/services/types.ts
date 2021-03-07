import type { BaseAssetsData, BaseDOMData, BasePluginData } from '@wp-plugins/services';
import type { OptionsType } from '@wp-plugins/adapters';
import type { ParseMode } from '@wp-plugins/utilities';
import type { RepeatableValue, ArrayField } from '@wp-plugins/form';

export interface WPTelegramCoreData extends BaseDOMData<AssetsData>, BasePluginData<DataShape, UiData> {}

export interface AssetsData extends BaseAssetsData {
	tgIconUrl: string;
	editProfileUrl: string;
	p2tgLogUrl?: string;
	botApiLogUrl?: string;
}

export interface TemplateMacro {
	label: string;
	macros: Array<string>;
	info?: string;
}

export interface UiData {
	debug_info?: string;
	post_types?: OptionsType;
	rule_types?: OptionsType;
	macros?: {
		post: TemplateMacro;
		terms: TemplateMacro;
		cf: TemplateMacro;
	};
}

export interface BasicFields {
	bot_token: string;
	bot_username?: string;
}

export type Rule = Partial<
	ArrayField<{
		param: string;
		operator: 'in' | 'not_in';
		values: Array<number | string>;
	}>
>;

export type RuleGroup = Partial<ArrayField<RepeatableValue<Array<Rule>>>>;

export type Rules = Array<RuleGroup>;

export interface CommonFields {
	active: boolean;
}

export interface PostToTelegramFields extends CommonFields {
	cats_as_tags?: boolean;
	channels?: Array<Partial<ArrayField<RepeatableValue<string>>>>;
	delay?: number;
	excerpt_length?: number;
	excerpt_preserve_eol?: boolean;
	excerpt_source?: 'post_content' | 'before_more' | 'post_excerpt';
	image_position?: 'before' | 'after';
	inline_button_text?: string;
	inline_url_button?: boolean;
	message_template?: string;
	misc?: Array<'disable_web_page_preview' | 'disable_notification'>;
	parse_mode?: ParseMode;
	plugin_posts?: boolean;
	post_edit_switch?: boolean;
	post_types?: Array<string>;
	rules?: Rules;
	send_featured_image?: boolean;
	send_when?: Array<'new' | 'existing'>;
	single_message?: boolean;
}

export interface PrivateNotificationsFields extends CommonFields {
	watch_emails?: string;
	chat_ids?: string;
	user_notifications?: boolean;
	message_template?: string;
	parse_mode?: ParseMode;
}

export interface ProxyFields extends CommonFields {
	proxy_method?: 'google_script' | 'php_proxy';
	script_url?: string;
	proxy_host?: string;
	proxy_port?: number;
	proxy_type?:
		| 'CURLPROXY_HTTP'
		| 'CURLPROXY_SOCKS4'
		| 'CURLPROXY_SOCKS4A'
		| 'CURLPROXY_SOCKS5'
		| 'CURLPROXY_SOCKS5_HOSTNAME';
	proxy_username?: string;
	proxy_password?: string;
}

export interface AdvancedFields {
	send_files_by_url?: boolean;
	clean_uninstall?: boolean;
	enable_logs?: 'bot_api' | 'p2tg';
}

export interface DataShape extends BasicFields {
	p2tg: PostToTelegramFields;
	notify: PrivateNotificationsFields;
	proxy: ProxyFields;
	advanced: AdvancedFields;
}
