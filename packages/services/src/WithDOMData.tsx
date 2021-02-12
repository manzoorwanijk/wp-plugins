import { PropsWithChildren, useEffect, useState } from 'react';

import { BaseDOMData, Plugins } from './types';

export interface WithDOMDataProps<Data extends BaseDOMData> {
	data: Data;
	plugin: keyof Plugins;
}

export const WithDOMData = <Data extends BaseDOMData>({
	children,
	data,
	plugin,
}: PropsWithChildren<WithDOMDataProps<Data>>): JSX.Element => {
	const [isDataSet, setIsDataSet] = useState(false);
	useEffect(() => {
		window[plugin] = data;
		setIsDataSet(true);

		return () => {
			delete window[plugin];
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return isDataSet ? <>{children}</> : null;
};
