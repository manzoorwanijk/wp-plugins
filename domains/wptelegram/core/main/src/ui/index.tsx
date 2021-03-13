import ReactDOM from 'react-dom';

import { ThemeProvider } from '@wp-plugins/adapters';
import { cleanup, setI18nData } from '@wp-plugins/services';

import App from './App';
import { FORM_ID } from '../constants';

const root = document.getElementById(FORM_ID);

const ThemedApp: React.FC = () => (
	<ThemeProvider>
		<App />
	</ThemeProvider>
);

// clea up notifications etc.
cleanup(FORM_ID);

setI18nData('wptelegram', 'wptelegram');

ReactDOM.render(<ThemedApp />, root);
