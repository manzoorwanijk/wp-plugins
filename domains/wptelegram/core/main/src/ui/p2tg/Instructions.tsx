import { __, sprintf } from '@wp-plugins/i18n';
import { Instructions as InstructionsUI, Code } from '@wp-plugins/components';
import { List, ListItem, Link } from '@wp-plugins/adapters';
import { createInterpolateElement } from '@wp-plugins/utilities';
import { useFormContext } from '@wp-plugins/form';

import { DataShape } from '../../services';

export const Instructions: React.FC = () => {
	const { watch } = useFormContext<DataShape>();
	const bot_username = watch('bot_username');

	return (
		<InstructionsUI highContrast={false}>
			<List as='ol' styleType='decimal'>
				<ListItem>{__('Create a Telegram channel or group.')}</ListItem>
				<ListItem>
					{createInterpolateElement(
						sprintf(__('Add your bot %s as Administrator to your Channel/Group.'), '<Username />'),
						{
							Username: (
								<>
									(<Code>@{bot_username}</Code>)
								</>
							),
						}
					)}
				</ListItem>
				<ListItem>{__('Enter the Channel Username in the field below.')}</ListItem>
				<List styleType='disc' ms='1em'>
					<ListItem>
						{createInterpolateElement(sprintf(__('Username must start with %s'), '<Symbol />'), {
							Symbol: <Code>@</Code>,
						})}
					</ListItem>
					<ListItem>
						{__('You can also use the Chat ID of a group or private chat.')}
						&nbsp;
						{createInterpolateElement(sprintf(__('Get it from %s.'), '<BotLink />'), {
							BotLink: (
								<Link href='https://t.me/MyChatInfoBot' isExternal>
									@MyChatInfoBot
								</Link>
							),
						})}
					</ListItem>
				</List>
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
