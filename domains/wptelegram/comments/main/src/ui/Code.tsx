import { CSSProperties, useEffect } from 'react';
import $ from 'jquery';

import { __ } from '@wp-plugins/i18n';
import { FormField, useFormContext } from '@wp-plugins/form';

import { getFieldLabel, FormData } from '../services';

const style: CSSProperties = {
	WebkitAppearance: 'none',
	backgroundColor: 'rgba(0, 0, 0, 0.05)',
	fontFamily: 'Menlo, Monaco, Consolas, "Courier New", monospace',
	fontSize: '13px',
	paddingBottom: '8px',
	paddingTop: '8px',
	resize: 'none',
	textAlign: 'left',
	whiteSpace: 'pre-wrap',
	wordBreak: 'break-all',
	wordWrap: 'break-word',
};

export const Code: React.FC = () => {
	const { watch, setValue } = useFormContext<FormData>();

	const code = watch('code', '');

	useEffect(() => {
		let attributesJSON = '';
		if (code) {
			try {
				const el = $(code.trim());
				if (el.length && 'SCRIPT' === el[0].nodeName) {
					const attributes = {};
					$.each(el[0].attributes, (i, attr) => {
						attributes[attr.name] = attr.value;
					});

					attributesJSON = JSON.stringify(attributes);
				}
			} catch (error) {
				console.error('CODE ERROR', error);
			}
		}
		setValue('attributes', attributesJSON);
	}, [code, setValue]);

	return (
		<>
			<FormField
				cols={60}
				description={__('Please read the instructions above.')}
				dir='ltr'
				fieldType='textarea'
				isRequired
				label={getFieldLabel('code')}
				name='code'
				rows={4}
				spellCheck={false}
				style={style}
			/>
			<FormField fieldType='hidden' name='attributes' />
		</>
	);
};
