import { Flex, Box, Text } from '@wp-plugins/adapters';
import { __ } from '@wp-plugins/i18n';
import { TestResult, TestResultType } from '@wp-plugins/services';

interface MessageResultProps {
	messageResult: TestResult;
	messageResultType: TestResultType;
}

export const TestMessageResult: React.FC<MessageResultProps> = ({ messageResult, messageResultType }) => {
	const testResults = Object.entries(messageResult);

	return testResults.length ? (
		<Box className='test-result' p='1em'>
			<Text color='gray.500'>{__('Test result:')}</Text>
			{testResults.map(([chat_id, result]) => {
				return (
					<Flex key={chat_id} py='1em'>
						<Box flexBasis='20%' minW='150px'>
							<Text fontWeight='bold' as='span'>
								{chat_id}
							</Text>
						</Box>
						<Box ml='1em'>
							<Text
								fontWeight='bold'
								color={messageResultType?.[chat_id] === 'ERROR' ? 'red.400' : 'green.500'}
								as='span'
							>
								{result}
							</Text>
						</Box>
					</Flex>
				);
			})}
		</Box>
	) : null;
};
