import { __, sprintf } from '@wp-plugins/i18n';
import { Box, Stack, Text, BoxProps, Link } from '@wp-plugins/adapters';
import { Smile } from '../Smile';
import { SectionCard } from '../SectionCard';

const StackItem: React.FC<BoxProps> = (props) => {
	return <Box p='1em' textAlign='center' borderBottom='1px' borderBottomColor='gray.200' width='100%' {...props} />;
};

export interface PluginInfoCardProps {
	description?: string;
	title: string;
	reviewLink?: string;
	socialIcons?: React.ReactNode;
	helpText?: string;
	supportLink?: string;
	supportLinkText?: string;
}

const linkHoverProps = { borderBottom: 'none' };
const bodyProps = { px: 0, py: 0 };

export const PluginInfoCard: React.FC<PluginInfoCardProps> = ({
	description,
	helpText,
	reviewLink,
	socialIcons,
	supportLink,
	supportLinkText,
	title,
}) => {
	return (
		<SectionCard title={title} border='1px' borderColor='gray.200' bodyProps={bodyProps}>
			<Stack spacing={1} align='center'>
				<StackItem>
					<Text as='p' fontStyle='italic' textAlign='start'>
						{description}
					</Text>
				</StackItem>
				{socialIcons && <StackItem>{socialIcons}</StackItem>}
				{reviewLink && (
					<StackItem>
						<Text mb='1.5em'>{sprintf(__('Do you like %s?'), title)}</Text>
						<Box>
							<Link
								href={reviewLink}
								rel='noopener noreferrer'
								target='_blank'
								textDecoration='none'
								mb='0.5em'
								_hover={linkHoverProps}
							>
								<Text as='span' color='orange.300' fontSize='1.5rem'>
									{'★★★★★'}
								</Text>
							</Link>
						</Box>
					</StackItem>
				)}
				<StackItem borderBottom={0}>
					<Box>
						<Text as='span'>{__('Need help?')}</Text>
					</Box>
					{helpText && (
						<Box>
							<Text as='span' fontWeight={600}>
								{helpText}
							</Text>
						</Box>
					)}
				</StackItem>

				{supportLink && (
					<StackItem p={0} borderBottom={0} w='100%'>
						<Link
							d='block'
							p='0.75rem 1.25rem'
							color='#004085'
							bg='#b8daff'
							fontWeight={700}
							fontStyle='italic'
							href={supportLink}
							target='_blank'
							rel='noopener noreferrer'
							textDecoration='none'
							_hover={linkHoverProps}
						>
							{supportLinkText || helpText}
						</Link>
					</StackItem>
				)}

				<StackItem>
					<Box>
						<Smile />
					</Box>
				</StackItem>
			</Stack>
		</SectionCard>
	);
};