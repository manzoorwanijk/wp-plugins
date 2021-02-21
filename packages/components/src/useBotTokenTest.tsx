import { useCallback, useMemo, useState } from 'react';

import { __ } from '@wp-plugins/i18n';
import { Button } from '@wp-plugins/adapters';
import { testBotToken, ResultType } from '@wp-plugins/services';

import { TestResult } from './TestResult';

export type BotTokenTest = {
	button: React.ReactNode;
	result: React.ReactNode;
};

export const useBotTokenTest = (bot_token: string, hasError?: boolean): BotTokenTest => {
	const [testingBotToken, setTestingBotToken] = useState(false);

	const [botTokenTestResult, setBotTokenTestResult] = useState('');

	const [botTokenTestResultType, setBotTokenTestResultType] = useState<ResultType>();

	const onClickTest = useCallback<React.MouseEventHandler>(
		async (event) => {
			await testBotToken(
				{
					bot_token,
					setInProgress: setTestingBotToken,
					setResult: setBotTokenTestResult,
					setResultType: setBotTokenTestResultType,
				},
				event
			);
		},
		[bot_token]
	);

	return useMemo(() => {
		const button = (
			<Button onClick={onClickTest} borderStartRadius='0' isDisabled={!bot_token || hasError || testingBotToken}>
				{testingBotToken ? __('Please wait…') : __('Test Token')}
			</Button>
		);

		const result = <TestResult result={botTokenTestResult} resultType={botTokenTestResultType} />;

		return { button, result };
	}, [botTokenTestResult, botTokenTestResultType, bot_token, hasError, onClickTest, testingBotToken]);
};
