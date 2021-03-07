import { Text, Link } from '@wp-plugins/adapters';
import { sprintf, __ } from '@wp-plugins/i18n';
import { FormField } from '@wp-plugins/form';
import { createInterpolateElement } from '@wp-plugins/utilities';

import { getFieldLabel, useData } from '../../services';
import { PREFIX } from './constants';

export const UserNotifications: React.FC = () => {
	const { editProfileUrl } = useData('assets');

	return (
		<>
			<FormField
				description={__('Allow users receive their email notifications on Telegram.')}
				fieldType='switch'
				label={getFieldLabel('user_notifications')}
				name={`${PREFIX}.user_notifications`}
			/>
			<Text mb='2em'>
				{createInterpolateElement(
					/* translators: 1 Plugin name */
					sprintf(__('Use %s to let them connect their Telegram account.'), '<Link />'),
					{
						Link: (
							<Link href='https://wordpress.org/plugins/wptelegram-login' isExternal>
								{'WP Telegram Login & Register'}
							</Link>
						),
					}
				)}
				<br />
				{createInterpolateElement(
					/* translators: 1 profile page */
					sprintf(__('They can also enter their Telegram Chat ID manually on %s page.'), '<Link />'),
					{
						Link: (
							<Link href={editProfileUrl} isExternal>
								{__('profile')}
							</Link>
						),
					}
				)}
			</Text>
		</>
	);
};
