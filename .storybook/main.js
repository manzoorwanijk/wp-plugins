const path = require('path');

const include = [path.resolve(__dirname, '../domains'), path.resolve(__dirname, '../packages')];
const stories = ['../domains/**/*.stories.tsx', '../packages/**/*.stories.@(ts|tsx)'];
const toPath = (_path) => path.join(process.cwd(), _path);

module.exports = {
	addons: [
		'@storybook/addon-knobs',
		'@storybook/addon-storysource',
		'@storybook/addon-viewport',
		'@storybook/addon-a11y',
		,
		{
			name: '@storybook/addon-docs',
			options: { configureJSX: true },
		},
		{
			name: '@storybook/preset-scss',
			options: {
				cssLoaderOptions: {
					modules: true,
				},
			},
		},
	],
	stories,
	webpackFinal: async (config) => {
		config.module.rules = config.module.rules.filter((f) => f.test.toString() !== /\.s[ca]ss$/.toString());

		config.module.rules.push({
			test: /\.scss$/,
			sideEffects: true,
			use: [
				'style-loader',
				'css-loader',
				{
					loader: 'sass-loader',
					options: {
						implementation: require('sass'),
					},
				},
			],
			include,
			exclude: ['/node_modules/'],
		});

		return {
			...config,
			resolve: {
				...config.resolve,
				alias: {
					...config.resolve.alias,
					'@emotion/core': toPath('node_modules/@emotion/react'),
					'emotion-theming': toPath('node_modules/@emotion/react'),
				},
			},
		};
	},
};
