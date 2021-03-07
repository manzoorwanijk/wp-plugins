import { useMemo } from 'react';
import { Tabs as ChakraTabs, TabsProps as ChakraTabsProps, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { append } from 'ramda';

export interface TabItemProps {
	id?: string;
	title?: React.ReactNode;
}

export interface TabItem extends TabItemProps {
	Component: React.ComponentType;
}

export interface TabsProps extends Partial<ChakraTabsProps> {
	items: Array<TabItem>;
	renderTab?: (props: TabItemProps) => JSX.Element;
	renderPanel?: (props: TabItemProps) => JSX.Element;
}

export const Tabs: React.FC<TabsProps> = ({ items, renderPanel, renderTab, ...rest }) => {
	const { tabList, tabPanels } = useMemo(() => {
		return items.reduce(
			(prevValue, { Component, id, title }, index) => {
				const tab = renderTab?.({ id, title }) || <Tab key={id || index}>{title}</Tab>;

				const panel = renderPanel?.({ id, title }) || (
					<TabPanel key={id || index}>
						<Component />
					</TabPanel>
				);

				const tabList = append(tab, prevValue.tabList);
				const tabPanels = append(panel, prevValue.tabPanels);

				return {
					tabList,
					tabPanels,
				};
			},
			{ tabList: [], tabPanels: [] }
		);
	}, [items, renderPanel, renderTab]);

	return (
		<ChakraTabs {...rest}>
			<TabList>{tabList}</TabList>
			<TabPanels>{tabPanels}</TabPanels>
		</ChakraTabs>
	);
};
