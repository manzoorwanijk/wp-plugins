import { ChakraProvider } from '@chakra-ui/react';

export const ThemeProvider: React.FC = ({ children }) => {
	return (
		<ChakraProvider resetCSS>
			<div id='test'>{children}</div>
		</ChakraProvider>
	);
};
