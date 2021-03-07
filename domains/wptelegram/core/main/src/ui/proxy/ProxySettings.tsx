import { useWatch } from '@wp-plugins/form';
import { SectionCard } from '@wp-plugins/components';
import { __ } from '@wp-plugins/i18n';
import { Collapse } from '@wp-plugins/adapters';

import { GoogleScript } from './GoogleScript';
import { PHPProxy } from './PHPProxy';
import { PREFIX } from './constants';
import { DataShape } from '../../services';

export const ProxySettings: React.FC = () => {
	const proxy_method = useWatch<DataShape['proxy']['proxy_method']>({ name: `${PREFIX}.proxy_method` });

	return proxy_method ? (
		<SectionCard title={__('Proxy settings')}>
			<Collapse in={proxy_method === 'google_script'} animateOpacity>
				<GoogleScript />
			</Collapse>
			<Collapse in={proxy_method === 'php_proxy'} animateOpacity>
				<PHPProxy />
			</Collapse>
		</SectionCard>
	) : null;
};
