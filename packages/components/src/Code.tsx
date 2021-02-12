import { Code as CodeAdapter, CodeProps } from '@wp-plugins/adapters';

export const Code: React.FC<CodeProps> = ({ children, ...rest }) => {
	return (
		<CodeAdapter
			whiteSpace='pre-wrap'
			p='0.4em'
			color='#c10808'
			backgroundColor='transparent'
			textAlign='left'
			{...rest}
		>
			{children}
		</CodeAdapter>
	);
};
