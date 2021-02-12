import { __, sprintf } from '@wp-plugins/i18n';
import { Instructions as InstructionsUI, Code } from '@wp-plugins/components';
import { List, ListItem, Link } from '@wp-plugins/adapters';
import { createInterpolateElement } from '@wp-plugins/utilities';

const { location } = window;

export const Instructions: React.FC = () => {
	return (
		<InstructionsUI>
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
				<ListItem>
					{createInterpolateElement(
						sprintf(
							/* translators: 1 command name, 2 bot name, 3 site url */
							__('Send %1$s command to %2$s, select your bot and then send %3$s'),
							'<Command />',
							'<Link />',
							'<Host />'
						),
						{
							Command: (
								<b>
									<Code>/setdomain</Code>
								</b>
							),
							Link: (
								<Link href='https://t.me/BotFather' isExternal>
									@BotFather
								</Link>
							),
							Host: (
								<b>
									<Code>{location.host}</Code>
								</b>
							),
						}
					)}
				</ListItem>
				<ListItem>
					{__('Test your bot token below and fill in the bot username if not filled automatically.')}
				</ListItem>
				<ListItem>{sprintf(__('Hit %s below'), __('Save Changes'))}</ListItem>
				<ListItem>{__("That's it. You are ready to rock :)")}</ListItem>
			</List>
		</InstructionsUI>
	);
};
