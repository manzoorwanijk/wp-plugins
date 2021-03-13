import { __ } from '@wp-plugins/i18n';
import { Link } from '@wp-plugins/adapters';
import { FormField } from '@wp-plugins/form';

export type ParseModeFieldProps = {
	label: React.ReactNode;
	name: string;
};

export const PARSE_MODE_OPTIONS = [
	{
		value: 'none',
		label: __('None'),
	},
	{
		value: 'Markdown',
		label: __('Markdown style'),
	},
	{
		value: 'HTML',
		label: __('HTML style'),
	},
];

export const ParseModeField: React.FC<ParseModeFieldProps> = ({ label, name }) => {
	return (
		<FormField
			name={name}
			fieldType='radio'
			label={label}
			after={
				<Link
					color='blue.500'
					href='https://core.telegram.org/bots/api/#formatting-options'
					isExternal
					mt='0.3em'
				>
					{__('Learn more')}
				</Link>
			}
			options={PARSE_MODE_OPTIONS}
		/>
	);
};
