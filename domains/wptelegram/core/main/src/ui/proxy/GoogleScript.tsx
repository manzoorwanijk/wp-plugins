import { __ } from '@wp-plugins/i18n';
import { FormField } from '@wp-plugins/form';
import { InstructionsLink } from '@wp-plugins/components';

import { getFieldLabel } from '../../services';
import { PREFIX } from './constants';

export const GoogleScript: React.FC = () => {
	return (
		<>
			<FormField
				name={`${PREFIX}.google_script_url`}
				fieldType='text'
				type='url'
				description={__('The requests to Telegram will be sent via this URL.')}
				label={getFieldLabel('google_script_url')}
				placeholder='https://script.google.com/macros/s/XxXxXxXxXxXxXxX/exec'
				maxWidth='700px'
				after={
					<InstructionsLink link='https://gist.github.com/manzoorwanijk/ee9ed032caedf2bb0c83dea73bc9a28e#how-to-deploy' />
				}
			/>
		</>
	);
};
