import { Box, Flex, Heading, Text } from '@wp-plugins/adapters';

import { SectionCard } from '../SectionCard';

export interface PluginHeaderProps {
	description?: string;
	logoUrl?: string;
	title: string;
	version: string;
	socialIcons?: React.ReactNode;
}

export const PluginHeader: React.FC<PluginHeaderProps> = ({ description, logoUrl, socialIcons, title, version }) => {
	return (
		<SectionCard
			title={
				<Flex alignItems='center'>
					{logoUrl && (
						<Box
							alt={title}
							as='img'
							className='header-logo'
							d='inline-block'
							h='2rem'
							marginEnd='0.5em'
							src={logoUrl}
							verticalAlign='middle'
							w='2rem'
						/>
					)}
					<Box whiteSpace='nowrap'>
						<Heading as='h4' size='md' fontWeight={600} d='inline-block' m={0}>
							{title}
						</Heading>
						<Text as='span' fontSize='80%' fontStyle='italic' color='gray.500'>
							&nbsp;v{version}
						</Text>
					</Box>
				</Flex>
			}
		>
			<Text as='p' fontStyle='italic' textAlign='justify'>
				{description}
			</Text>
			{socialIcons}
		</SectionCard>
	);
};
