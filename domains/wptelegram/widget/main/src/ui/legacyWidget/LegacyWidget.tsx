import { useCallback, useEffect, useState } from 'react';

import { Description } from '@wp-plugins/components';
import { __ } from '@wp-plugins/i18n';
import { FormField, useFormContext } from '@wp-plugins/form';
import { TestResult } from '@wp-plugins/components';
import { Button } from '@wp-plugins/adapters';
import { testBotToken, ResultType } from '@wp-plugins/services';

import { getFieldLabel, FormData } from '../../services';
import { Instructions } from './Instructions';
import { LegacyWidgetInfo } from './LegacyWidgetInfo';

const prefix = 'legacy_widget';

const botTokenAddonProps = { px: '0' };

const authorPhotoOptions = [
	{ value: 'auto', label: __('Auto') },
	{ value: 'always_show', label: __('Always show') },
	{ value: 'always_hide', label: __('Always hide') },
];

export const LegacyWidget: React.FC = () => {
	const { getValues, errors, trigger, watch } = useFormContext<FormData>();

	const [testingBotToken, setTestingBotToken] = useState(false);

	const [botTokenTestResult, setBotTokenTestResult] = useState('');

	const [botTokenTestResultType, setBotTokenTestResultType] = useState<ResultType>();

	const username = watch(`${prefix}.username`);
	const bot_token = watch(`${prefix}.bot_token`);

	useEffect(() => {
		if (!username) {
			// trigger validation for bot_token when username is removed
			trigger(`${prefix}.bot_token`);
		}
	}, [trigger, username]);

	const onClickTest = useCallback<React.MouseEventHandler>(
		async (event) => {
			const { legacy_widget } = getValues();
			await testBotToken(
				{
					bot_token: legacy_widget.bot_token,
					setInProgress: setTestingBotToken,
					setResult: setBotTokenTestResult,
					setResultType: setBotTokenTestResultType,
				},
				event
			);
		},
		[getValues]
	);
	return (
		<>
			<Description>
				{__('Legacy widget is a full height widget which supports both channels and groups.')}
			</Description>
			<Description fontStyle='normal'>
				{__('Note:')}
				&nbsp;
				{__('You can set the default values below.')}
				&nbsp;
				{__('You can also set all these fields via shortcodes and widgets.')}
			</Description>
			<Instructions />
			<FormField
				addonBefore='@'
				description={__('Default channel username.')}
				fieldType='text'
				label={getFieldLabel('username')}
				maxW='200px'
				name={`${prefix}.username`}
				placeholder='WPTelegram'
			/>
			<FormField
				addonAfter={
					<Button
						onClick={onClickTest}
						borderStartRadius='0'
						isDisabled={!bot_token || Boolean(errors.legacy_widget?.bot_token) || testingBotToken}
					>
						{testingBotToken ? __('Please wait…') : __('Test Token')}
					</Button>
				}
				addonAfterProps={botTokenAddonProps}
				after={<TestResult result={botTokenTestResult} resultType={botTokenTestResultType} />}
				borderEnd='0'
				borderEndRadius='0'
				description={__('Please read the instructions above.')}
				fieldType='text'
				isRequired={Boolean(username)}
				label={getFieldLabel('bot_token')}
				maxW='350px'
				name={`${prefix}.bot_token`}
			/>
			<FormField
				fieldType='text'
				label={getFieldLabel('width')}
				maxW='130px'
				name={`${prefix}.width`}
				placeholder={`300 ${__('or')} 100%`}
			/>
			<FormField
				fieldType='select'
				label={getFieldLabel('author_photo')}
				name={`${prefix}.author_photo`}
				options={authorPhotoOptions}
			/>
			<FormField
				label={getFieldLabel('num_messages')}
				description={__('Number of messages to display in the widget.')}
				fieldType='number'
				min={1}
				max={50}
				maxWidth='100px'
				name={`${prefix}.num_messages`}
				placeholder='5'
			/>
			<LegacyWidgetInfo />
		</>
	);
};
