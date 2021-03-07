import { __, sprintf } from '@wp-plugins/i18n';
import { Instructions as InstructionsUI, Code } from '@wp-plugins/components';
import { List, ListItem, Link } from '@wp-plugins/adapters';
import { createInterpolateElement } from '@wp-plugins/utilities';

export const Instructions: React.FC = () => {
	return (
		<InstructionsUI mt='2em' highContrast={false}>
			<List as='ol' styleType='decimal'>
				<ListItem>
					{createInterpolateElement(
						sprintf(
							/* translators: 1 command name, 2 bot name */
							__('Create a Bot by sending %1$s command to %2$s.'),
							'<Command />',
							'<Link />'
						),
						{
							Command: (
								<b>
									<Code>/newbot</Code>
								</b>
							),
							Link: (
								<Link href='https://t.me/BotFather' isExternal>
									@BotFather
								</Link>
							),
						}
					)}
				</ListItem>
				<ListItem>
					{sprintf(__('After completing the steps %s will provide you the Bot Token.'), '@BotFather')}
				</ListItem>
				<ListItem>
					{createInterpolateElement(
						__('Copy the token and paste into the Bot Token field below.') +
							' ' +
							sprintf(
								/* translators: %s application name */
								__('For ease, use %s'),
								'<Link />'
							),
						{
							Link: (
								<Link href='https://desktop.telegram.org' isExternal>
									{__('Telegram Desktop')}
								</Link>
							),
						}
					)}
				</ListItem>
				<ListItem>{__('Test your bot token below.')}</ListItem>
				<ListItem>{__('Activate the modules you want to use.')}</ListItem>
				<ListItem>{__('Configure the activated modules.')}</ListItem>
				<ListItem>
					{createInterpolateElement(
						sprintf(
							/* translators: %s button name */
							__('Hit %s below.'),
							'<Button />'
						),
						{
							Button: <b>{__('Save Changes')}</b>,
						}
					)}
				</ListItem>
			</List>
		</InstructionsUI>
	);
};
