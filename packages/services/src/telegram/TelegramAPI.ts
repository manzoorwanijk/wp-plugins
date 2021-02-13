import { ApiData } from '../types';
import { fetchAPI, APIFetchOptions } from '../apiFetch';
import { ApiParams, TelegramApiMethod, TelegramApi } from './types';

class ApiClient implements TelegramApi {
	private apiData: Partial<ApiData> = {};

	private botToken: string;

	private baseUrl: string;

	private path = '/wptelegram-bot/v1';

	private event: React.MouseEvent | React.KeyboardEvent;

	deleteWebhook?: TelegramApiMethod;
	getChatMembersCount?: TelegramApiMethod;
	getMe?: TelegramApiMethod;
	getWebhookInfo?: TelegramApiMethod;
	sendMessage?: TelegramApiMethod;
	setWebhook?: TelegramApiMethod;

	constructor(botToken?: string) {
		this.botToken = botToken;
	}

	setBotToken = (botToken: string): void => {
		this.botToken = botToken;
	};

	setApiData = (apiData: ApiData): void => {
		this.apiData = apiData;
	};

	setBaseUrl = (baseUrl: string): void => {
		this.baseUrl = baseUrl;
	};

	setEvent = (event: React.MouseEvent | React.KeyboardEvent): void => {
		this.event = (event?.nativeEvent || event) as React.MouseEvent;
	};

	getOptions = (apiMethod: string, apiParams: ApiParams): APIFetchOptions => {
		// if holding shift key while testing
		if (this.event?.shiftKey) {
			if (!this.apiData.use || this.apiData.use === 'SERVER') {
				this.apiData.use = 'BROWSER';
			} else if (this.apiData.use === 'BROWSER') {
				this.apiData.use = 'SERVER';
			}
		}
		let options: APIFetchOptions = {};

		if (this.apiData.use === 'BROWSER') {
			options = {
				data: apiParams,
				// use absolute URL
				url: this.buildUrl(apiMethod),
				// override the value set by wp-api-fetch
				credentials: 'omit',
			};
		} else {
			options = {
				data: {
					bot_token: this.botToken,
					api_params: apiParams,
				},
				// use WP REST relative path
				path: `${this.path}/${apiMethod}`,
			};
		}

		return options;
	};

	buildUrl = (apiMethod?: string): string => {
		if (this.apiData.use === 'BROWSER') {
			this.setBaseUrl('https://api.telegram.org');
			return `${this.baseUrl}/bot${this.botToken}/${apiMethod}`;
		}
		return this.baseUrl;
	};

	sendRequest = async <T>(apiMethod: string, apiParams: ApiParams, options?: APIFetchOptions): Promise<T> => {
		if (!this.botToken) {
			console.error('Bot token is empty');
			return;
		}

		const fetchOptions: APIFetchOptions = { ...this.getOptions(apiMethod, apiParams), ...options };

		return await fetchAPI.POST<T>(fetchOptions);
	};
}

// dynamic method to make api calls
const botApi = new window.Proxy(new ApiClient(), {
	get: (client, prop) => {
		if ('undefined' === typeof client[prop]) {
			return async <T>(apiParams: ApiParams, options?: APIFetchOptions) => {
				return await client.sendRequest<T>(prop as string, apiParams, options);
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
