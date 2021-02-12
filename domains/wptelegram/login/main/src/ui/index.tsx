import ReactDOM from 'react-dom';

import { ThemeProvider } from '@wp-plugins/adapters';

import App from './App';

const root = document.getElementById('wptelegram-pro-settings');

const ThemedApp: React.FC = () => (
	<ThemeProvider>
		<App />
	</ThemeProvider>
);

ReactDOM.render(<ThemedApp />, root);
