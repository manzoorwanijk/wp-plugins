import { Description } from '@wp-plugins/components';
import { __ } from '@wp-plugins/i18n';
import { FormField } from '@wp-plugins/form';

import { getFieldLabel } from '../../services';
import { PREFIX } from './constants';
import { Instructions } from './Instructions';
import { Destination } from './Destination';
import { IfBotToken } from '../IfBotToken';
import { IfActive } from '../IfActive';
import { Rules } from './rules';
import { MessageSettings } from './messageSettings';
import { MessageKeyboard } from './messageKeyboard';
import { Miscellaneous } from './Miscellaneous';

export const P2TG: React.FC = () => {
	return (
		<>
			<Description>{__('With this module, you can configure how the posts are sent to Telegram.')}</Description>
			<FormField name={`${PREFIX}.active`} fieldType='switch' label={getFieldLabel('active')} />

			<IfActive name={`${PREFIX}.active`}>
				<IfBotToken>
					<Instructions />
					<Destination />
					<Rules />
					<MessageSettings />
					<MessageKeyboard />
					<Miscellaneous />
				</IfBotToken>
			</IfActive>
		</>
	);
};
