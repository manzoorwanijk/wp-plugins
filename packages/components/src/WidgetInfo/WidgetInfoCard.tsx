import { __ } from '@wp-plugins/i18n';
import { Stack, StackProps } from '@wp-plugins/adapters';
import { SectionCard } from '@wp-plugins/components';

const bodyProps = { px: 0, py: 0 };

export interface WidgetInfoCardProps {
	spacing?: StackProps['spacing'];
	title?: string;
}

export const WidgetInfoCard: React.FC<WidgetInfoCardProps> = ({ children, spacing = '1em', title }) => {
	return (
		<SectionCard title={title || __('Widget Info')} bodyProps={bodyProps}>
			<Stack variant='flush' spacing={spacing}>
				{children}
			</Stack>
		</SectionCard>
	);
};
