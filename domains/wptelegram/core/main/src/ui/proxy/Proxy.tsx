import { Description, SectionCard, ProxyDisclaimer } from '@wp-plugins/components';
import { __ } from '@wp-plugins/i18n';
import { FormField } from '@wp-plugins/form';

import { getFieldLabel } from '../../services';
import { PREFIX } from './constants';
import { IfActive } from '../IfActive';
import { ProxySettings } from './ProxySettings';

const proxy_options = [
	{
		value: 'google_script',
		label: __('Google Script'),
	},
	{
		value: 'php_proxy',
		label: __('PHP Proxy'),
	},
];

export const Proxy: React.FC = () => {
	return (
		<>
			<Description>
				{__('The module will help you bypass the ban on Telegram by making use of proxy.')}
			</Description>
			<ProxyDisclaimer />
			<FormField name={`${PREFIX}.active`} fieldType='switch' label={getFieldLabel('active')} />

			<IfActive name={`${PREFIX}.active`}>
				<SectionCard title={__('Proxy Method')}>
					<FormField
						name={`${PREFIX}.proxy_method`}
						fieldType='radio'
						label={getFieldLabel('proxy_method')}
						description={__('Google Script is preferred.')}
						isInline
						options={proxy_options}
					/>
				</SectionCard>

				<ProxySettings />
			</IfActive>
		</>
	);
};
