import { CSSProperties } from 'react';

import { isDev } from '@wp-plugins/utilities';

import { Collapse } from '../Collapse';

const style: CSSProperties = {
	borderRadius: '5px',
	boxSizing: 'border-box',
	padding: '1em 2em',
	color: '#a9ce47',
	backgroundColor: '#26203d',
	whiteSpace: 'pre-wrap',
};

export interface DebugDataProps {
	data: any;
	asJson?: boolean;
	asCollapse?: boolean;
}

export const DebugData: React.FC<DebugDataProps> = ({ data, asJson = true, asCollapse = true }) => {
	if (!isDev) {
		return null;
	}

	const dataToRender = asJson ? JSON.stringify(data, null, 2) : data;

	const output = <pre style={style}>{dataToRender}</pre>;

	if (!asCollapse) {
		return output;
	}

	return <Collapse title={'Debug Data'}>{output}</Collapse>;
};
