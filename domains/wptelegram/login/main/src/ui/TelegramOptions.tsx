import { useCallback, useState } from 'react';

import { __, sprintf } from '@wp-plugins/i18n';
import { FormField, useFormContext } from '@wp-plugins/form';
import { SectionCard, TestResult } from '@wp-plugins/components';
import { Button } from '@wp-plugins/adapters';
import { testBotToken, ResultType } from '@wp-plugins/services';

import { getFieldLabel, FormData } from '../services';

const botTokenAddonProps = { px: '0' };

export const TelegramOptions = () => {
	const { getValues, setValue, trigger } = useFormContext<FormData>();

	const [botUsernameReadOnly, setBotUsernameReadOnly] = useState(true);
	const botUsernameDoubleClick = useCallback(() => setBotUsernameReadOnly(false), []);
	const [testingBotToken, setTestingBotToken] = useState(false);

	const [botTokenTestResult, setBotTokenTestResult] = useState('');

	const [botTokenTestResultType, setBotTokenTestResultType] = useState<ResultType>();

	const onClickTest = useCallback<React.MouseEventHandler>(
		(event) => {
			const { bot_token } = getValues();
			testBotToken(
				{
					bot_token,
					setInProgress: setTestingBotToken,
					setResult: setBotTokenTestResult,
					setResultType: setBotTokenTestResultType,
					onComplete: (token, { username }) => {
						setValue('bot_username', username);
						trigger('bot_username');
					},
				},
				event
			);
		},
		[getValues, setValue, trigger]
	);

	return (
		<SectionCard title={__('Telegram Options')}>
			<FormField
				addonAfter={
					<Button onClick={onClickTest} borderStartRadius='0' isDisabled={testingBotToken}>
						{testingBotToken ? __('Please wait…') : __('Test Token')}
					</Button>
				}
				addonAfterProps={botTokenAddonProps}
				after={<TestResult result={botTokenTestResult} resultType={botTokenTestResultType} />}
				borderEnd='0'
				borderEndRadius='0'
				description={__('Please read the instructions above.')}
				fieldType='text'
				isRequired
				label={getFieldLabel('bot_token')}
				maxW='350px'
				name='bot_token'
			/>

			<FormField
				addonBefore='@'
				description={sprintf(__('Use %s above to set automatically.'), __('Test Token'))}
				fieldType='text'
				isReadOnly={botUsernameReadOnly}
				isRequired
				label={getFieldLabel('bot_username')}
				maxW='200px'
				name='bot_username'
				onDoubleClick={botUsernameDoubleClick}
			/>
		</SectionCard>
	);
};
