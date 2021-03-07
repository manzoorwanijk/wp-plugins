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
			<List styleType='circle'>
				<ListItem>
					{__('To receive notifications privately:')}
					<List as='ol' styleType='decimal'>
						<ListItem>
							{createInterpolateElement(
								/* translators: 1 bot username */
								sprintf(__('Get your Chat ID from %s and enter it below.'), '<BotLink />'),
								{
									BotLink: (
										<Link href='https://t.me/MyChatInfoBot' isExternal>
											@MyChatInfoBot
										</Link>
									),
								}
							)}
						</ListItem>
						<ListItem color='red'>
							{createInterpolateElement(
								sprintf(
									/* translators: 1 bot username */
									__('Send your own bot %s a message to start the conversation.'),
									'<Username />'
								),
								{
									Username: (
										<>
											(<Code>@{bot_username}</Code>)
										</>
									),
								}
							)}
						</ListItem>
					</List>
				</ListItem>
				<ListItem>
					{__('To receive notifications into a group:')}
					<List as='ol' styleType='decimal'>
						<ListItem>
							{createInterpolateElement(
								/* translators: 1 bot username */
								sprintf(__('Add %s to the group to get its Chat ID.'), '<Username />'),
								{
									Username: <Code>@MyChatInfoBot</Code>,
								}
							)}
						</ListItem>
						<ListItem>
							{createInterpolateElement(
								sprintf(__('Enter the Chat ID in %s field below.'), '<Field />'),
								{
									Field: <b>{__('Send it to')}</b>,
								}
							)}
						</ListItem>
						<ListItem>
							{createInterpolateElement(
								sprintf(
									/* translators: 1 bot username */
									__('Add your own bot %s to the group.'),
									'<Username />'
								),
								{
									Username: (
										<>
											(<Code>@{bot_username}</Code>)
										</>
									),
								}
							)}
						</ListItem>
					</List>
				</ListItem>
			</List>
		</InstructionsUI>
	);
};
