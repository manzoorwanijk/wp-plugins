import { Form, yupResolver } from '@wp-plugins/form';
import { Cols75x25 } from '@wp-plugins/components';

import { useData, validationSchema } from '../services';
import { FORM_ID } from '../constants';
import { LoginOptions } from './LoginOptions';
import { TelegramOptions } from './TelegramOptions';
import { ButtonOptions } from './ButtonOptions';
import { ErrorMessageOptions } from './ErrorMessageOptions';
import Sidebar from './Sidebar';
import { Header } from './Header';
import { SubmitInfo } from './SubmitInfo';
import { Instructions } from './Instructions';
import { useInit, useOnSubmit } from '../services';

const resolver = yupResolver(validationSchema);

const App: React.FC = () => {
	useInit();

	const { savedSettings } = useData();

	const onSubmit = useOnSubmit();

	const leftCol = (
		<>
			<Header />
			<Instructions />
			<TelegramOptions />
			<LoginOptions />
			<ButtonOptions />
			<ErrorMessageOptions />
			<SubmitInfo />
		</>
	);

	const rightCol = <Sidebar />;

	return (
		<Form defaultValues={savedSettings} id={FORM_ID} resolver={resolver} onSubmit={onSubmit}>
			<Cols75x25 leftCol={leftCol} rightCol={rightCol}></Cols75x25>
		</Form>
	);
};

export default App;
