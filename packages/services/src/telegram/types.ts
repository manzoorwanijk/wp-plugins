import React from 'react';
import { BaseApiUtilArgs } from '../ajax/types';

export type TelegramApiMethod = (api_params: any, ajaxOverrides?: JQueryAjaxSettings) => JQuery.jqXHR<any>;

export type WebhookStatus = 'SET' | 'NOT_SET' | 'ERROR';

export interface TelegramApi {
	deleteWebhook?: TelegramApiMethod;
	getChatMembersCount?: TelegramApiMethod;
	getMe?: TelegramApiMethod;
	getWebhookInfo?: TelegramApiMethod;
	sendMessage?: TelegramApiMethod;
	setWebhook?: TelegramApiMethod;
}

export interface TelegramApiUtilBaseArgs extends BaseApiUtilArgs {
	bot_token: string;
	chat_id?: string;
}

export type TelegramApiUtil<Args = TelegramApiUtilBaseArgs> = (
	args: Args,
	event?: React.MouseEvent | React.KeyboardEvent
) => JQuery.jqXHR<any>;

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
