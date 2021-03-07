import { Divider } from '@wp-plugins/adapters';
import { Description, SectionCard } from '@wp-plugins/components';
import { __ } from '@wp-plugins/i18n';
import { FormField } from '@wp-plugins/form';

import { getFieldLabel } from '../../services';
import { PREFIX } from './constants';
import { Instructions } from './Instructions';
import { IfBotToken } from '../IfBotToken';
import { IfActive } from '../IfActive';
import { WatchEmails } from './WatchEmails';
import { UserNotifications } from './UserNotifications';
import { MessageSettings } from './MessageSettings';

export const Notify: React.FC = () => {
	return (
		<>
			<Description>
				{__(
					'The module will watch the Email Notifications sent from this site and deliver them to you on Telegram.'
				)}
			</Description>
			<FormField name={`${PREFIX}.active`} fieldType='switch' label={getFieldLabel('active')} />

			<IfActive name={`${PREFIX}.active`}>
				<IfBotToken>
					<Instructions />
					<SectionCard title={__('Notification Settings')}>
						<WatchEmails />
						<Divider mt='2em' />
						<UserNotifications />
						<MessageSettings />
					</SectionCard>
					<Divider />
				</IfBotToken>
			</IfActive>
		</>
	);
};
