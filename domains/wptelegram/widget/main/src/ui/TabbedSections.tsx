import { CSSProperties, useCallback } from 'react';

import { Tabs, TabsProps, Tab, Text } from '@wp-plugins/adapters';
import { __ } from '@wp-plugins/i18n';
import { WarningIcon } from '@wp-plugins/icons';
import { useFormContext } from '@wp-plugins/form';

import { AjaxWidget } from './ajaxWidget';
import { LegacyWidget } from './legacyWidget';
import { JoinLink } from './joinLink';
import { Advanced } from './advanced';

const tabs = [
	{
		id: 'ajax_widget',
		title: __('Ajax Widget'),
		Component: AjaxWidget,
	},
	{
		id: 'legacy_widget',
		title: __('Legacy Widget'),
		Component: LegacyWidget,
	},
	{
		id: 'join_link',
		title: __('Join Link'),
		Component: JoinLink,
	},
	{
		id: 'advanced',
		title: __('Advanced'),
		Component: Advanced,
	},
];

const tabTitleStyle: CSSProperties = {
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'space-between',
};

export const TabbedSections: React.FC = () => {
	const { errors, formState } = useFormContext();
	const { submitCount } = formState;

	const renderTab = useCallback<TabsProps['renderTab']>(
		({ id, title }) => {
			const showError = Boolean(submitCount) && id in errors;

			const tabTitle = (
				<Text style={tabTitleStyle} color={showError ? 'red.500' : null} fontWeight={showError ? 'bold' : null}>
					{showError && <WarningIcon />}
					&nbsp;
					{title}
				</Text>
			);
			return <Tab key={id}>{tabTitle}</Tab>;
		},
		[errors, submitCount]
	);

	return <Tabs items={tabs} renderTab={renderTab} />;
};
