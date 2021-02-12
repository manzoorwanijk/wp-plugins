import { __ } from '@wordpress/i18n';

import botApi from './TelegramAPI';
import { getErrorResultFromXHR } from '../ajax';
import { TestBotToken, SendTextMessage, TelegramApiUtil, WebhookUtil } from './types';

export const setWebhook: WebhookUtil = (args, event) => {
	botApi.setEvent(event);

	const { bot_token, setInProgress, setStatus, setResult, setResultType, url, allowed_updates } = args;

	setInProgress(true);

	const options: JQueryAjaxSettings = {
		error: (jqXHR) => {
			console.log('ERROR', jqXHR);

			setStatus('ERROR');
			setResultType('ERROR');

			setResult(getErrorResultFromXHR(jqXHR));
		},
		success: (data, _, jqXHR) => {
			if (data?.ok) {
				setStatus('SET');
				setResultType('SUCCESS');
				setResult('');
			} else {
				setStatus('ERROR');
				setResultType('ERROR');

				setResult(getErrorResultFromXHR(jqXHR));
			}
		},
		complete: () => setInProgress(false),
	};

	const params = {
		url,
		allowed_updates,
	};

	botApi.bot_token = bot_token;
	return botApi.setWebhook(params, options);
};

export const deleteWebhook: WebhookUtil = (args, event) => {
	botApi.setEvent(event);

	const { bot_token, setInProgress, setStatus, setResult, setResultType } = args;

	setInProgress(true);

	const options: JQueryAjaxSettings = {
		error: (jqXHR) => {
			console.log('ERROR', jqXHR);

			setStatus('ERROR');

			setResultType('ERROR');

			setResult(getErrorResultFromXHR(jqXHR));
		},
		success: () => {
			setStatus('NOT_SET');
			setResultType('ERROR');
			setResult('');
		},
		complete: () => setInProgress(false),
	};

	botApi.bot_token = bot_token;
	return botApi.deleteWebhook({}, options);
};

export const checkWebhookInfo: WebhookUtil = (args, event) => {
	botApi.setEvent(event);

	const { bot_token, setInProgress, setStatus, url } = args;

	setInProgress(true);

	const options: JQueryAjaxSettings = {
		error: (jqXHR) => {
			console.log('ERROR', jqXHR);

			setStatus('ERROR', () => getErrorResultFromXHR(jqXHR));
		},
		success: ({ result }) => {
			if (url === result.url) {
				setStatus('SET');
			} else {
				setStatus('NOT_SET');
			}
		},
		complete: () => setInProgress(false),
	};

	botApi.bot_token = bot_token;
	return botApi.getWebhookInfo({}, options);
};

export const checkMemberCount: TelegramApiUtil = (args) => {
	const { bot_token, chat_id, setInProgress, setResult, setResultType } = args;

	setInProgress(true);

	const options: JQueryAjaxSettings = {
		error: (jqXHR) => {
			console.log('ERROR', jqXHR);

			setResultType('ERROR');

			setResult(getErrorResultFromXHR(jqXHR));
		},
		success: ({ result }) => {
			setResultType('SUCCESS');
			setResult(result);
		},
		complete: () => setInProgress(false),
	};

	botApi.bot_token = bot_token;
	return botApi.getChatMembersCount({ chat_id }, options);
};

export const sendTestMessage: SendTextMessage = (args, event) => {
	botApi.setEvent(event);

	const text =
		args.text ||
		window.prompt(
			__('A message will be sent to the Channel/Group/Chat. You can modify the text below'),
			__('This is a test message')
		);

	if (!text) {
		return;
	}

	return sendTextMessage({ ...args, text }, event);
};

export const sendTextMessage: SendTextMessage = (args, event) => {
	botApi.setEvent(event);

	const { bot_token, chat_id, setInProgress, setResult, setResultType, text } = args;

	setInProgress?.(true);

	const options: JQueryAjaxSettings = {
		error: (jqXHR) => {
			console.log('ERROR', jqXHR);

			setResultType?.('ERROR');

			setResult?.(getErrorResultFromXHR(jqXHR));
		},
		success: () => {
			setResultType?.('SUCCESS');
			setResult?.(__('Success'));
		},
		complete: () => setInProgress?.(false),
	};

	botApi.bot_token = bot_token;
	return botApi.sendMessage({ chat_id, text }, options);
};

export const testBotToken: TestBotToken = (args, event) => {
	botApi.setEvent(event);

	const { bot_token, setInProgress, setResult, setResultType, onComplete } = args;

	setInProgress(true);

	const options: JQueryAjaxSettings = {
		error: (jqXHR) => {
			console.log('ERROR', jqXHR);

			setResultType('ERROR');

			onComplete(bot_token, {});

			setResult(getErrorResultFromXHR(jqXHR));
		},
		success: ({ result }) => {
			setResultType('SUCCESS');

			onComplete(bot_token, result);

			setResult(`${result.first_name} (@${result.username})`);
		},
		complete: () => setInProgress(false),
	};

	botApi.bot_token = bot_token;
	return botApi.getMe({}, options);
};
