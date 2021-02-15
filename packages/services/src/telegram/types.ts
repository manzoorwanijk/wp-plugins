import { APIFetchOptions, BaseApiUtilArgs } from '../apiFetch';

export type ApiParams = Partial<Record<'string', any>>;

export type TelegramApiMethod<P = any> = (apiParams?: P, fetchOptions?: APIFetchOptions) => Promise<any>;

export type WebhookStatus = 'SET' | 'NOT_SET' | 'ERROR';

export interface TelegramApi {
	deleteWebhook?: TelegramApiMethod;
	getChatMembersCount?: TelegramApiMethod;
	getMe?: TelegramApiMethod;
	getWebhookInfo?: TelegramApiMethod;
	sendMessage?: TelegramApiMethod<SendTextMessageArgs>;
	setWebhook?: TelegramApiMethod;
}

export interface TelegramApiUtilBaseArgs extends BaseApiUtilArgs {
	bot_token: string;
	chat_id?: string;
}

export type TelegramApiUtil<A extends TelegramApiUtilBaseArgs = TelegramApiUtilBaseArgs, T = unknown> = (
	args: A,
	event?: React.MouseEvent | React.KeyboardEvent
) => Promise<T>;

export interface TestBotTokenArgs extends TelegramApiUtilBaseArgs {
	onComplete: (bot_token: string, result: any) => void;
}

export type TestBotToken = TelegramApiUtil<TestBotTokenArgs>;

export interface SendTextMessageArgs extends TelegramApiUtilBaseArgs {
	text: string;
	parse_mode?: string;
}

export type SendTextMessage = TelegramApiUtil<SendTextMessageArgs>;

export interface WebhookUtilArgs extends TelegramApiUtilBaseArgs {
	setStatus: (status: WebhookStatus, getError?: () => any) => void;
	url?: string;
	allowed_updates?: Array<string> | string;
}

export type WebhookUtil = TelegramApiUtil<WebhookUtilArgs>;
