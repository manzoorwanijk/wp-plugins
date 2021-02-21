import { Box, Flex, Text } from '@wp-plugins/adapters';
import { __ } from '@wp-plugins/i18n';
import { TestResult, TestResultType } from '@wp-plugins/services';

interface MemberCountResultProps {
	memberCountResult: TestResult;
	memberCountResultType: TestResultType;
}

export const MemberCountResult: React.FC<MemberCountResultProps> = ({ memberCountResult, memberCountResultType }) => {
	const result = Object.entries(memberCountResult);

	return result.length ? (
		<Box mt='1em'>
			<Text>{__('Members Count:')}</Text>
			{result.map(([chat_id, result]) => {
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
								color={memberCountResultType?.[chat_id] === 'ERROR' ? 'red.400' : 'green.500'}
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