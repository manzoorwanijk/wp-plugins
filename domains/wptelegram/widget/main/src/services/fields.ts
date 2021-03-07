import * as yup from 'yup';

import { __ } from '@wp-plugins/i18n';
import { fieldLabelGetter, getFormErrorMessage, BOT_TOKEN_REGEX, TG_USERNAME_REGEX } from '@wp-plugins/utilities';
import { DataShape } from './types';

export const fieldLabels = {
	bot_token: () => __('Bot Token'),
	username: () => __('Username'),
	width: () => __('Widget Width'),
	height: () => __('Widget Height'),
	author_photo: () => __('Author Photo'),
	num_messages: () => __('Number of Messages'),
	telegram_blocked: () => __('Host blocks Telegram'),
	google_script_url: () => __('Google Script URL'),
	url: () => __('Channel Link'),
	text: () => __('Button text'),
	post_types: () => __('Add to post types'),
	position: () => __('Position'),
	priority: () => __('Priority'),
};

export const getFieldLabel = fieldLabelGetter(fieldLabels);

const ajaxWidgetSchema = {
	username: yup.string().matches(TG_USERNAME_REGEX, {
		message: () => getErrorMessage('username', 'invalid'),
		excludeEmptyString: true,
	}),
	width: yup.string().matches(/^[1-9]*?[0-9]*?(?:px|r?em|%)?$/, {
		message: () => getErrorMessage('width', 'invalid'),
		excludeEmptyString: true,
	}),
	height: yup.string().matches(/^[1-9]*?[0-9]*?(?:px|r?em|%)?$/i, {
		message: () => getErrorMessage('height', 'invalid'),
		excludeEmptyString: true,
	}),
};

export const validationSchema = yup.object({
	ajax_widget: yup.object(ajaxWidgetSchema),
	legacy_widget: yup.object({
		...ajaxWidgetSchema,
		bot_token: yup
			.string()
			.matches(BOT_TOKEN_REGEX, {
				message: () => getErrorMessage('bot_token', 'invalid'),
				excludeEmptyString: true,
			})
			// make bot token required when username is added
			.when('username', (username, schema) => {
				return username ? schema.required(() => getErrorMessage('bot_token', 'required')) : schema;
			}),
		author_photo: yup
			.mixed<DataShape['legacy_widget']['author_photo']>()
			.oneOf(['auto', 'always_show', 'always_hide']),
		num_messages: yup.string().matches(/^[1-5]?[0-9]?$/, {
			message: () => getErrorMessage('num_messages', 'invalid'),
			excludeEmptyString: true,
		}),
	}),
	join_link: yup.object({
		url: yup
			.string()
			.nullable()
			.url(() => getErrorMessage('url', 'invalid')),
		text: yup.string().nullable(),
		post_types: yup.array().of(yup.string()),
		position: yup.mixed<DataShape['join_link']['position']>().oneOf(['before_content', 'after_content']),
		priority: yup.string().matches(/^[0-9]*$/, {
			message: () => getErrorMessage('priority', 'invalid'),
			excludeEmptyString: true,
		}),
	}),
	advanced: yup.object({
		telegram_blocked: yup.boolean().nullable(),
		google_script_url: yup
			.string()
			.nullable()
			.url(() => getErrorMessage('google_script_url', 'invalid')),
	}),
});

export const getErrorMessage = getFormErrorMessage(fieldLabels);
