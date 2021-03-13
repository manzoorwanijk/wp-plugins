import * as yup from 'yup';

import { sprintf, __ } from '@wp-plugins/i18n';
import {
	fieldLabelGetter,
	getFormErrorMessage,
	BOT_TOKEN_REGEX,
	TG_USERNAME_REGEX,
	TG_CHAT_ID_REGEX,
} from '@wp-plugins/utilities';
import { DataShape, ProxyFields, Rule } from './types';

export const fieldLabels = {
	active: () => __('Active'),
	bot_token: () => __('Bot Token'),
	bot_username: () => __('Bot Username'),
	cats_as_tags: () => __('Categories as hashtags'),
	channels: () => __('Channel(s)'),
	chat_id: () => __('Chat ID'),
	chat_ids: () => __('Send it to'),
	clean_uninstall: () => __('Remove settings on uninstall'),
	debug_info: () => __('Debug Info'),
	delay: () => __('Delay in Posting'),
	disable_notification: () => __('Disable Notifications'),
	disable_web_page_preview: () => __('Disable Web Page Preview'),
	enable_logs: () => __('Enable logs for'),
	excerpt_length: () => __('Excerpt Length'),
	excerpt_preserve_eol: () => __('Excerpt Newlines'),
	excerpt_source: () => __('Excerpt Source'),
	google_script_url: () => __('Google Script URL'),
	image_position: () => __('Image Position'),
	inline_button_text: () => __('Inline button text'),
	inline_button_url: () => __('Inline button URL'),
	inline_url_button: () => __('Add Inline URL Button'),
	message_template: () => __('Message Template'),
	misc: () => __('Other settings'),
	parse_mode: () => __('Formatting'),
	plugin_posts: () => __('Plugin generated posts'),
	post_edit_switch: () => __('Post edit switch'),
	post_types: () => __('Post type'),
	proxy_host: () => __('Proxy Host'),
	proxy_method: () => __('Proxy Method'),
	proxy_password: () => __('Password'),
	proxy_port: () => __('Proxy Port'),
	proxy_type: () => __('Proxy Type'),
	proxy_username: () => __('Username'),
	send_featured_image: () => __('Featured Image'),
	send_files_by_url: () => __('Send files by URL'),
	send_when: () => __('Send when'),
	single_message: () => __('Single message'),
	user_notifications: () => __('Notifications to Users'),
	watch_emails: () => __('If Email goes to'),
};

export const getFieldLabel = fieldLabelGetter(fieldLabels);

export const validationSchema = yup.object({
	bot_token: yup
		.string()
		.matches(BOT_TOKEN_REGEX, {
			message: () => getErrorMessage('bot_token', 'invalid'),
			excludeEmptyString: true,
		})
		.required(() => getErrorMessage('bot_token', 'required')),
	bot_username: yup.string().matches(TG_USERNAME_REGEX, {
		message: () => getErrorMessage('bot_username', 'invalid'),
		excludeEmptyString: true,
	}),
	p2tg: yup.object({
		channels: yup
			.array()
			.compact((field) => !field.value)
			.of(
				yup.object({
					value: yup
						.string()
						// match @username and chat ID
						.matches(TG_CHAT_ID_REGEX, {
							message: () => getErrorMessage('chat_id', 'invalid'),
							excludeEmptyString: true,
						}),
				})
			)
			.when('active', (active, schema) => {
				return !active
					? schema
					: schema
							.required(sprintf(__('At least one %s is required.'), __('channel')))
							.min(1, sprintf(__('At least one %s is required.'), __('channel')));
			}),
		send_when: yup
			.array()
			.of(
				yup
					.mixed<DataShape['p2tg']['send_when'][number]>()
					.oneOf(['new', 'existing'], () => getErrorMessage('send_when', 'invalid'))
			),
		post_types: yup.array().of(yup.string()),
		rules: yup.array().of(
			yup.object({
				value: yup.array().of(
					yup.object({
						param: yup.string(),
						operator: yup.mixed<Rule['operator']>().oneOf(['in', 'not_in']),
						values: yup.array().of(yup.mixed<Rule['values']>()),
					})
				),
			})
		),
		message_template: yup.string(),
		excerpt_source: yup
			.string()
			.oneOf<DataShape['p2tg']['excerpt_source']>(['post_content', 'before_more', 'post_excerpt']),
		excerpt_length: yup
			.number()
			.integer()
			.positive()
			.typeError(() => sprintf(__('%s must be a number.'), getFieldLabel('excerpt_length')))
			// make sure it's >= 1
			.min(1)
			.max(300)
			.nullable(),
		excerpt_preserve_eol: yup.boolean(),
		send_featured_image: yup.boolean(),
		image_position: yup.mixed<DataShape['p2tg']['image_position']>().oneOf(['before', 'after']),
		single_message: yup.boolean(),
		cats_as_tags: yup.boolean(),
		parse_mode: yup.string().oneOf<DataShape['p2tg']['parse_mode']>(['none', 'Markdown', 'HTML']),
		disable_web_page_preview: yup.boolean(),
		inline_button_text: yup.string(),
		inline_button_url: yup.string(),
		delay: yup
			.number()
			.nullable()
			.typeError(() => sprintf(__('%s must be a number.'), getFieldLabel('delay')))
			.positive()
			.min(0),
		disable_notification: yup.boolean(),
	}),
	notify: yup.object({
		watch_emails: yup.string(),
		chat_ids: yup
			.array()
			.compact((field) => !field.value)
			.of(
				yup.object({
					value: yup
						.string()
						// match @username and chat ID
						.matches(TG_CHAT_ID_REGEX, {
							message: () => getErrorMessage('chat_id', 'invalid'),
							excludeEmptyString: true,
						}),
				})
			),
		message_template: yup.string(),
		parse_mode: yup.string().oneOf<DataShape['p2tg']['parse_mode']>(['none', 'Markdown', 'HTML']),
	}),
	proxy: yup.object({
		proxy_method: yup
			.string()
			.oneOf<ProxyFields['proxy_method']>(['google_script', 'php_proxy', null], () =>
				getErrorMessage('proxy_method', 'invalid')
			)
			.nullable(),
		google_script_url: yup
			.string()
			.nullable()
			.url(() => getErrorMessage('google_script_url', 'invalid')),
		proxy_host: yup.string().nullable(),
		proxy_port: yup.string().nullable(),
		proxy_type: yup
			.string()
			.nullable()
			.oneOf<ProxyFields['proxy_type']>(
				[
					null,
					'CURLPROXY_HTTP',
					'CURLPROXY_SOCKS4',
					'CURLPROXY_SOCKS4A',
					'CURLPROXY_SOCKS5',
					'CURLPROXY_SOCKS5_HOSTNAME',
				],
				() => getErrorMessage('proxy_type', 'invalid')
			),
		proxy_username: yup.string().nullable(),
		proxy_password: yup.string().nullable(),
	}),
	advanced: yup.object(),
});

export const getErrorMessage = getFormErrorMessage(fieldLabels);
