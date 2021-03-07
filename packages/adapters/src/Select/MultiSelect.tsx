import ReactSelect, { Props } from 'react-select';

export type MultiSelectProps = Props<{ label: string; value: string }, true>;

export const MultiSelect: React.FC<MultiSelectProps> = (props) => {
	return <ReactSelect {...props} />;
};
