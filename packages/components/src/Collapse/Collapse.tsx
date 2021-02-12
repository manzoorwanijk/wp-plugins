import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box } from '@wp-plugins/adapters';

export interface CollapseProps {
	title: string;
	body?: React.ReactNode;
}

export const Collapse: React.FC<CollapseProps> = ({ body, children, title }) => {
	return (
		<Accordion allowToggle>
			<AccordionItem>
				<AccordionButton>
					<Box flex='1' textAlign='start'>
						{title}
					</Box>
					<AccordionIcon />
				</AccordionButton>
				<AccordionPanel>
					<Box>{body || children}</Box>
				</AccordionPanel>
			</AccordionItem>
		</Accordion>
	);
};
