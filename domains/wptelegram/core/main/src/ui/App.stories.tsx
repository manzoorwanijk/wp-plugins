import { WithDOMData } from '@wp-plugins/services';
import { WPTelegramCoreData } from '../services';

import App from './App';

const dummyDOMData: WPTelegramCoreData = {
	api: {
		admin_url: window.location.href,
		use: 'BROWSER',
	},
	assets: {
		logoUrl: 'https://ps.w.org/wptelegram/assets/icon-128x128.png',
		tgIconUrl: 'https://ps.w.org/wptelegram/assets/icon-128x128.png',
		editProfileUrl: window.location.href,
	},
	pluginInfo: {
		name: 'wptelegram',
		title: 'WP Telegram',
		version: '1.2.3',
		description: 'With this plugin, you can send posts to Telegram and receive notifications and do lot more :)',
	},
	savedSettings: {
		bot_token: '1234',
		bot_username: 'testbot',
		p2tg: {
			active: true,
			channels: [{ value: '@hello' }, { value: '@world' }],
			send_when: ['new'],
			post_types: ['post'],
			rules: [{ value: [{ param: 'post', values: [], operator: 'in' }] }],
			excerpt_source: 'post_content',
			image_position: 'before',
			parse_mode: 'none',
			misc: [],
		},
		notify: {
			active: true,
			parse_mode: 'none',
		},
		proxy: {
			active: true,
			proxy_method: null,
			proxy_type: null,
		},
		advanced: { enable_logs: null },
	},
	uiData: {
		debug_info: 'PHP: 7.4.13\nWP: 5.6.2\nWP Telegram: 2.2.5',
		post_types: [
			{ value: 'post', label: 'Post (post)' },
			{ value: 'page', label: 'Page (page)' },
			{ value: 'product', label: 'Product (product)' },
		],
		rule_types: [
			{ value: 'post', label: 'Post (post)' },
			{ value: 'tax:category', label: 'Category' },
		],
		macros: {
			post: {
				label: 'Post Data',
				macros: [
					'{post_title}',
					'{post_author}',
					'{post_excerpt}',
					'{post_content}',
					'{short_url}',
					'{full_url}',
				],
			},
			terms: {
				label: 'Taxonomy Terms',
				macros: ['{tags}', '{categories}', '{terms:taxonomy}', '{terms:product_cat}', '{terms:product_tag}'],
				info:
					'Replace <code>taxonomy</code> in <code>{terms:taxonomy}</code> by the name of the taxonomy to insert its terms attached to the post. For example <code>{terms:product_cat}</code> and <code>{terms:product_tag}</code> in WooCommerce',
			},
			cf: {
				label: 'Custom Fields',
				macros: ['{cf:custom_field}', '{cf:field_name}'],
				info:
					'Replace <code>custom_field</code> and <code>field_name</code> in <code>{cf:custom_field}</code> by the name of the Custom Field. For example <code>{cf:rtl_title}</code>, <code>{cf:_regular_price}</code>',
			},
		},
	},
};

export const Main = () => (
	<WithDOMData plugin='wptelegram' data={dummyDOMData}>
		<App />
	</WithDOMData>
);

const story = {
	component: Main,
	title: 'Core/Main',
};

export default story;
