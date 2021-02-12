import { Box, Flex, BoxProps } from '@wp-plugins/adapters';

const commonColumnProps: BoxProps = {
	borderWidth: '1px',
	borderColor: 'gray.200',
	borderRadius: '0.1rem',
};

const baseColumnWidth: BoxProps['maxW'] = ['100%', '100%', '100%'];

interface Cols75x25Props {
	addBorders?: boolean;
	leftCol: React.ReactNode;
	rightCol: React.ReactNode;
}

const flexBasisFirst = [...baseColumnWidth, '75%'];
const flexBasisSecond = [...baseColumnWidth, '25%'];

const pxFirst = ['0.4rem', '0.8rem'];

export const Cols75x25: React.FC<Cols75x25Props> = ({ addBorders, leftCol, rightCol, children }) => {
	return (
		<Flex flexWrap='wrap'>
			<Box flexBasis={flexBasisFirst} maxW={flexBasisFirst} px='0.4rem'>
				<Box {...(addBorders && commonColumnProps)} mb='1rem' px={pxFirst} background='#fff'>
					{leftCol}
				</Box>
			</Box>
			<Box flexBasis={flexBasisSecond} maxW={flexBasisSecond} px='0.4rem'>
				<Box {...(addBorders && commonColumnProps)} mb='1rem' background='#fff'>
					{rightCol}
				</Box>
			</Box>
			{children}
		</Flex>
	);
};
