import { Form, yupResolver, useForm } from '@wp-plugins/form';
import { Cols75x25 } from '@wp-plugins/components';

import { useData, validationSchema, DataShape } from '../services';
import { FORM_ID } from '../constants';
import Sidebar from './Sidebar';
import { Header } from './Header';
import { SubmitInfo } from './SubmitInfo';
import { useInit, useOnSubmit, useOnInvalid } from '../services';
import { TabbedSections } from './TabbedSections';

const resolver = yupResolver<DataShape>(validationSchema);

const App: React.FC = () => {
	useInit();

	const { savedSettings: defaultValues } = useData();

	const form = useForm<DataShape>({ defaultValues, resolver, mode: 'onBlur' });

	const onSubmit = useOnSubmit(form);

	const onInvalid = useOnInvalid();

	const leftCol = (
		<>
			<Header />
			<TabbedSections />
			<SubmitInfo />
		</>
	);
	const rightCol = <Sidebar />;

	return (
		<Form id={FORM_ID} onSubmit={form.handleSubmit(onSubmit, onInvalid)} form={form}>
			<Cols75x25 leftCol={leftCol} rightCol={rightCol}></Cols75x25>
		</Form>
	);
};

export default App;
