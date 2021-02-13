import { __ } from '@wp-plugins/i18n';

import { getErrorMessage } from '../apiFetch';
import botApi from './TelegramAPI';
import { TestBotToken, SendTextMessage, TelegramApiUtil, WebhookUtil } from './types';

export const setWebhook: WebhookUtil = async (args, event) => {
	init(args, event);

	const { setInProgress, setStatus, setResult, setResultType, url, allowed_updates } = args;

	const params = { url, allowed_updates };

	try {
		const data = await botApi.setWebhook(params);
		if (data?.ok) {
			setStatus('SET');
			setResultType('SUCCESS');
			setResult('');
		} else {
			setStatus('ERROR');
			setResultType('ERROR');
			setResult(getErrorMessage(data));
		}
	} catch (error) {
		console.log('ERROR', error);

		setStatus('ERROR');
		setResultType('ERROR');

		setResult(getErrorMessage(error));
	} finally {
		setInProgress?.(false);
	}
};

export const deleteWebhook: WebhookUtil = async (args, event) => {
	init(args, event);

	const { setInProgress, setStatus, setResult, setResultType } = args;

	try {
		await botApi.deleteWebhook({});
		setStatus('NOT_SET');
		setResultType('SUCCESS');
		setResult('');
	} catch (error) {
		console.log('ERROR', error);

		setStatus('ERROR');

		setResultType('ERROR');

		setResult(getErrorMessage(error));
	} finally {
		setInProgress?.(false);
	}
};

export const checkWebhookInfo: WebhookUtil = async (args, event) => {
	init(args, event);

	const { setInProgress, setStatus, url } = args;

	try {
		const { result } = await botApi.getWebhookInfo({});
		if (url === result.url) {
			setStatus('SET');
		} else {
			setStatus('NOT_SET');
		}
	} catch (error) {
		console.log('ERROR', error);

		setStatus('ERROR', () => getErrorMessage(error));
	} finally {
		setInProgress?.(false);
	}
};

export const checkMemberCount: TelegramApiUtil = async (args) => {
	init(args);

	const { chat_id, setInProgress, setResult, setResultType } = args;

	try {
		const { result } = await botApi.getChatMembersCount({ chat_id });

		setResultType?.('SUCCESS');
		setResult?.(result);
	} catch (error) {
		console.log('ERROR', error);

		setResultType?.('ERROR');
		setResult?.(getErrorMessage(error));
	} finally {
		setInProgress?.(false);
	}
};

export const sendTestMessage: SendTextMessage = (args, event) => {
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

export const sendTextMessage: SendTextMessage = async (args, event) => {
	init(args, event);

	const { chat_id, setInProgress, setResult, setResultType, text } = args;

	try {
		await botApi.sendMessage({ chat_id, text });
		setResultType?.('SUCCESS');
		setResult?.(__('Success'));
	} catch (error) {
		console.log('ERROR', error);

		setResultType?.('ERROR');
		setResult?.(getErrorMessage(error));
	} finally {
		setInProgress?.(false);
	}
};

export const testBotToken: TestBotToken = async (args, event) => {
	init(args, event);

	const { bot_token, setInProgress, setResult, setResultType, onComplete } = args;

	try {
		const { result } = await botApi.getMe({});
		setResultType('SUCCESS');

		onComplete(bot_token, result);

		setResult(`${result.first_name} (@${result.username})`);
	} catch (error) {
		console.log('ERROR', error);

		setResultType?.('ERROR');
		setResult?.(getErrorMessage(error));

		onComplete(bot_token, {});
	} finally {
		setInProgress?.(false);
	}
};

const init: TelegramApiUtil = async (args, event) => {
	botApi.setEvent(event);

	const { bot_token, setInProgress } = args;
	setInProgress?.(true);

	botApi.setBotToken(bot_token);
};
