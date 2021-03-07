import { useCallback, useEffect, useState } from 'react';

import { __ } from '@wp-plugins/i18n';
import { FormField, useFormContext } from '@wp-plugins/form';
import { OptionsType } from '@wp-plugins/adapters';
import { useLocalStorage } from '@wp-plugins/services';
import { usePrevious } from '@wp-plugins/utilities';

import { useFetchRuleValues } from '../../../services';
import { RuleSetProps } from './types';

const STORAGE_KEY = 'p2tg_rule_values';

type RuleValuesCache = { [key: string]: OptionsType };

const loadingMessage = () => __('Loading...');
const noOptionsMessage = () => __('No options available');

export const RuleSetValues: React.FC<RuleSetProps & { ruleSetName: string }> = ({ rule, ruleSetName }) => {
	const [isFetchingValues, setIsFetchingValues] = useState(false);
	const [defaultRuleValues, setDefaulRuleValues] = useState<OptionsType>([]);

	const fetchRuleValues = useFetchRuleValues();
	const { getItem, setItem } = useLocalStorage<RuleValuesCache>(STORAGE_KEY, {}, sessionStorage);

	const { watch, setValue } = useFormContext();
	const param = watch(`${ruleSetName}.param`);

	const previousParam = usePrevious(param);

	useEffect(() => {
		// reset values if param changes
		if (previousParam && previousParam !== param) {
			setValue(`${ruleSetName}.values`, []);
			setDefaultValues(param);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [param, previousParam]);

	const setDefaultValues = useCallback(
		(param: string) => {
			if (!param) {
				return;
			}
			const values = getItem(param, []);

			if (values.length) {
				setDefaulRuleValues(values);
			} else {
				fetchRuleValues({
					param,
					setInProgress: setIsFetchingValues,
					setResult: (result) => {
						setDefaulRuleValues(result);
						// add values to cache
						setItem(param, result);
					},
				});
			}
		},
		[fetchRuleValues, getItem, setItem]
	);

	useEffect(() => {
		setDefaultValues(rule.param);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const loadValuesOptions = useCallback(
		(inputValue, callback) => {
			fetchRuleValues({
				param: rule.param,
				search: inputValue,
				setInProgress: setIsFetchingValues,
				setResult: (result) => {
					callback(result);
				},
			});
		},
		[fetchRuleValues, rule.param]
	);

	return (
		<FormField
			closeMenuOnSelect={false}
			className='values'
			defaultOptions={defaultRuleValues}
			defaultValue={rule.values as any}
			fieldType='multiselect.async'
			isLoading={isFetchingValues}
			loadOptions={loadValuesOptions}
			loadingMessage={loadingMessage}
			name={`${ruleSetName}.values`}
			noOptionsMessage={noOptionsMessage}
			placeholder={__('Select...')}
		/>
	);
};
