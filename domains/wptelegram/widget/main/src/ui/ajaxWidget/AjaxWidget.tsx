import { Description } from '@wp-plugins/components';
import { __ } from '@wp-plugins/i18n';
import { FormField } from '@wp-plugins/form';
import { getFieldLabel } from '../../services';
import { AjaxWidgetInfo } from './AjaxWidgetInfo';

const prefix = 'ajax_widget';

export const AjaxWidget: React.FC = () => {
	return (
		<>
			<Description>
				{__('Ajax widget is a beautiful scrollable widget which only supports channels.')}
			</Description>
			<Description fontStyle='normal'>
				{__('Note:')}
				&nbsp;
				{__('You can set the default values below.')}
				&nbsp;
				{__('You can also set all these fields via shortcodes and widgets.')}
			</Description>
			<FormField
				addonBefore='@'
				description={__('Default channel username.')}
				fieldType='text'
				label={getFieldLabel('username')}
				maxW='200px'
				name={`${prefix}.username`}
				placeholder='WPTelegram'
			/>
			<FormField
				fieldType='text'
				label={getFieldLabel('width')}
				maxW='130px'
				name={`${prefix}.width`}
				placeholder={`300 ${__('or')} 100%`}
			/>
			<FormField
				fieldType='text'
				label={getFieldLabel('height')}
				maxW='100px'
				name={`${prefix}.height`}
				placeholder={'600'}
			/>
			<AjaxWidgetInfo />
		</>
	);
};
