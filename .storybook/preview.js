import * as React from 'react';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';

import { ThemeProvider } from '@wp-plugins/adapters';

const withTheme = (StoryFn) => (
	<ThemeProvider>
		<div id='story-wrapper'>
			<StoryFn />
		</div>
	</ThemeProvider>
);

export const decorators = [withTheme];

export const parameters = {
	viewport: {
		viewports: MINIMAL_VIEWPORTS,
	},
};
