import { sendAjaxRequest } from '../ajax';
import { ApiData } from '../types';
import { TelegramApiMethod, TelegramApi } from './types';

// const api = window.wptelegramPro?.api;

class ApiClient implements TelegramApi {
	apiData: Partial<ApiData> = {};

	bot_token: string;

	base_url: string;

	event: React.MouseEvent | React.KeyboardEvent;

	deleteWebhook?: TelegramApiMethod;
	getChatMembersCount?: TelegramApiMethod;
	getMe?: TelegramApiMethod;
	getWebhookInfo?: TelegramApiMethod;
	sendMessage?: TelegramApiMethod;
	setWebhook?: TelegramApiMethod;

	constructor(bot_token?: string) {
		this.bot_token = bot_token;
	}

	setApiData = (apiData: ApiData): void => {
		this.apiData = apiData;
	};

	setEvent = (event: React.MouseEvent | React.KeyboardEvent): void => {
		this.event = (event?.nativeEvent || event) as React.MouseEvent;
	};

	getSettings = (api_method: string, api_params: any): JQueryAjaxSettings => {
		// if holding shift key while testing
		if (this.event?.shiftKey) {
			if (!this.apiData.use || this.apiData.use === 'SERVER') {
				this.apiData.use = 'BROWSER';
			} else if (this.apiData.use === 'BROWSER') {
				this.apiData.use = 'SERVER';
			}
		}
		let data: JQueryAjaxSettings['data'];
		let url: string;
		const settings: JQueryAjaxSettings = {};

		if (this.apiData.use === 'BROWSER') {
			url = this.buildUrl(api_method);
			data = api_params;
			settings.crossDomain = true;
		} else {
			url = this.buildUrl();
			data = {
				bot_token: this.bot_token,
				api_method,
				api_params,
			};
		}
		settings.url = url;
		settings.data = JSON.stringify(data);
		return settings;
	};

	buildUrl = (api_method?: string): string => {
		if (this.apiData.use === 'BROWSER') {
			this.base_url = 'https://api.telegram.org';
			return `${this.base_url}/bot${this.bot_token}/${api_method}`;
		}
		return (this.base_url = `${this.apiData.rest_url}/bot-api`);
	};

	sendRequest = (api_method: string, api_params: any, ajaxOverrides?: JQueryAjaxSettings): JQuery.jqXHR<any> => {
		if (!this.bot_token) {
			console.error('Bot token is empty');
			return;
		}

		const settings: JQueryAjaxSettings = { ...this.getSettings(api_method, api_params), ...ajaxOverrides };
		const complete = settings?.complete as JQuery.Ajax.CompleteCallback<any>;
		settings.complete = (jqXHR, textStatus) => {
			this.event = null;
			if (complete) {
				complete(jqXHR, textStatus);
			}
		};
		return sendAjaxRequest(settings);
	};
}

// dynamic method to make api calls
const botApi = new window.Proxy(new ApiClient(), {
	get: (client, prop) => {
		if ('undefined' === typeof client[prop]) {
			return (api_params: any, ajaxOverrides?: JQueryAjaxSettings) => {
				return client.sendRequest(prop as string, api_params, ajaxOverrides);
			};
		}
		if ('function' !== typeof client[prop]) {
			return client[prop];
		}
		return client[prop];
	},
	set: (client, prop, value) => {
		// do not allow certain things to be changed
		if (typeof client[prop] === 'function' || prop === 'base_url') {
			return false;
		}
		// eslint-disable-next-line no-param-reassign
		client[prop] = value;
		return true;
	},
});

export default botApi;
