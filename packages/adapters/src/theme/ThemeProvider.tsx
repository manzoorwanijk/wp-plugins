import { ChakraProvider } from '@chakra-ui/react';

import './styles.scss';

export const ThemeProvider: React.FC = ({ children }) => {
	return <ChakraProvider resetCSS>{children}</ChakraProvider>;
};
