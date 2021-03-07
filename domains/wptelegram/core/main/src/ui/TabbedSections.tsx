import { CSSProperties, useCallback } from 'react';

import { Tabs, TabsProps, Tab, Text } from '@wp-plugins/adapters';
import { __ } from '@wp-plugins/i18n';
import { WarningIcon } from '@wp-plugins/icons';
import { useFormContext } from '@wp-plugins/form';
import { useActiveTab } from '@wp-plugins/services';

import { Basics } from './basics';
import { P2TG } from './p2tg';
import { Notify } from './notify';
import { Proxy } from './proxy';
import { Advanced } from './advanced';

const tabs = [
	{
		id: 'basic',
		title: __('Basics'),
		Component: Basics,
	},
	{
		id: 'p2tg',
		title: __('Post to Telegram'),
		Component: P2TG,
	},
	{
		id: 'notify',
		title: __('Private Notifications'),
		Component: Notify,
	},
	{
		id: 'proxy',
		title: __('Proxy'),
		Component: Proxy,
	},
	{
		id: 'advanced',
		title: __('Advanced settings'),
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

	const { getActiveTab, setActiveTab } = useActiveTab('wptelegram');

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

	return <Tabs defaultIndex={getActiveTab(0)} items={tabs} onChange={setActiveTab} renderTab={renderTab} />;
};
