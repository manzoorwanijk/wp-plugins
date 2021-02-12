import { __ } from '@wp-plugins/i18n';
import { Box, Text } from '@wp-plugins/adapters';
import { ResultType } from '@wp-plugins/services';

interface RenderTestResultProps {
	result: React.ReactNode;
	resultType: ResultType;
}

export const TestResult: React.FC<RenderTestResultProps> = ({ result, resultType }) => {
	return result ? (
		<Box my='0.5em'>
			<Text color='gray.500' as='i'>
				{__('Test Result:')}
			</Text>{' '}
			<Text fontWeight='bold' color={resultType === 'ERROR' ? 'red.400' : 'green.500'} as='span'>
				{result}
			</Text>
		</Box>
	) : null;
};
