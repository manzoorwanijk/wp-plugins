import ReactSelectAsync, { Props } from 'react-select/async';

import { components } from './components';

export type MultiSelectAsyncProps = Props<{ label: string; value: string }, true>;

export const MultiSelectAsync: React.FC<MultiSelectAsyncProps> = (props) => {
	return <ReactSelectAsync components={components} {...props} />;
};
