import { Box, Flex, Heading, Text } from '@wp-plugins/adapters';
import type { PluginInfo, BaseAssetsData } from '@wp-plugins/services';
import { Description } from '../Description';

import { SectionCard } from '../SectionCard';

export interface PluginHeaderProps {
	pluginInfo: PluginInfo;
	assets: BaseAssetsData;
	socialIcons?: React.ReactNode;
}

export const PluginHeader: React.FC<PluginHeaderProps> = ({ assets, pluginInfo, socialIcons }) => {
	return (
		<SectionCard
			title={
				<Flex alignItems='center'>
					{assets.logoUrl && (
						<Box
							alt={pluginInfo.title}
							as='img'
							className='header-logo'
							d='inline-block'
							h='2rem'
							marginEnd='0.5em'
							src={assets.logoUrl}
							verticalAlign='middle'
							w='2rem'
						/>
					)}
					<Box whiteSpace='nowrap'>
						<Heading as='h4' size='md' fontWeight={600} d='inline-block' m={0}>
							{pluginInfo.title}
						</Heading>
						<Text as='span' fontSize='80%' fontStyle='italic' color='gray.500'>
							&nbsp;v{pluginInfo.version}
						</Text>
					</Box>
				</Flex>
			}
		>
			<Description>{pluginInfo.description}</Description>
			{socialIcons}
		</SectionCard>
	);
};
