import { memo, useCallback, useMemo, useState } from 'react';

import { __ } from '@wp-plugins/i18n';
import { TG_USERNAME_REGEX } from '@wp-plugins/utilities';
import { Button, ButtonProps } from '@wp-plugins/adapters';
import { checkMemberCount, sendTestMessage, TestResult, TestResultType } from '@wp-plugins/services';

import { MemberCountResult, TestMessageResult } from './TestResult';

export type ChatWithTest = {
	button: typeof Button;
	result: React.ReactNode;
	memberCount?: React.ReactNode;
	onBlur?: React.FocusEventHandler<HTMLInputElement>;
};

export const useChatWithTest = (bot_token?: string): ChatWithTest => {
	const [checkingMemberCount, setCheckingMemberCount] = useState({});
	const [memberCountResult, setMemberCountResult] = useState<TestResult>({});
	const [memberCountResultType, setMemberCountResultType] = useState<TestResultType>({});

	const [sendingTestMessage, setSendingTestMessage] = useState('');
	const [testMessageResult, setTestMessageResult] = useState<TestResult>({});
	const [testMessageResultType, setTestMessageResultType] = useState<TestResultType>({});

	const onClickTest = useCallback(
		(chatId): React.MouseEventHandler => async (event) => {
			const chat_id = TG_USERNAME_REGEX.test(chatId) ? `@${chatId}` : chatId;
			setMemberCountResult({});
			await sendTestMessage(
				{
					bot_token,
					chat_id,
					text: '',
					setInProgress: (val) => setSendingTestMessage(val && chat_id),
					setResult: (result) =>
						setTestMessageResult({
							...testMessageResult,
							[chatId]: result,
						}),
					setResultType: (resultType) =>
						setTestMessageResultType({
							...testMessageResultType,
							[chatId]: resultType,
						}),
				},
				event
			);
		},
		[bot_token, testMessageResult, testMessageResultType]
	);

	const onBlur = useCallback<React.FocusEventHandler<HTMLInputElement>>(
		async ({ nativeEvent: e }) => {
			setTestMessageResult({});
			const chatId = (e.target as HTMLInputElement)?.value;
			if (!bot_token || !chatId || checkingMemberCount[chatId]) {
				return;
			}
			const chat_id = TG_USERNAME_REGEX.test(chatId) ? `@${chatId}` : chatId;

			await checkMemberCount({
				bot_token,
				chat_id,
				setInProgress: (val) =>
					setCheckingMemberCount((prevState) => ({
						...prevState,
						[chatId]: val,
					})),
				setResult: (result) =>
					setMemberCountResult((prevState) => ({
						...prevState,
						[chatId]: result,
					})),
				setResultType: (resultType) =>
					setMemberCountResultType((prevState) => ({
						...prevState,
						[chatId]: resultType,
					})),
			});
		},
		[bot_token, checkingMemberCount]
	);

	const button = memo<ButtonProps>(({ value: chat_id, isDisabled }) => {
		return (
			<Button
				isDisabled={!bot_token || isDisabled || Boolean(sendingTestMessage) || !chat_id}
				onClick={onClickTest(chat_id)}
				borderStartRadius='0'
			>
				{sendingTestMessage && sendingTestMessage === chat_id ? __('Please wait…') : __('Send Test')}
			</Button>
		);
	});

	return useMemo(() => {
		const result = (
			<TestMessageResult messageResult={testMessageResult} messageResultType={testMessageResultType} />
		);

		const memberCount = (
			<MemberCountResult memberCountResult={memberCountResult} memberCountResultType={memberCountResultType} />
		);

		return { button, result, memberCount, onBlur };
	}, [button, memberCountResult, memberCountResultType, onBlur, testMessageResult, testMessageResultType]);
};
