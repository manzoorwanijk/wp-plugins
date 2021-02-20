import { Button, Placeholder as WPPlaceholder } from '@wordpress/components';

import { __ } from '@wp-plugins/i18n';

const errorStyle = { border: '2px solid #f71717' };

export const Placeholder: React.FC<any> = ({ error, label, onChangeURL, onSubmit, url }) => {
	const style = error ? errorStyle : null;

	return (
		<WPPlaceholder icon='wordpress-alt' label={label} className='wp-block-embed-telegram'>
			<form onSubmit={onSubmit}>
				<input
					aria-label={label}
					className='components-placeholder__input'
					onChange={onChangeURL}
					placeholder='https://t.me/WPTelegram/102'
					style={style}
					type='url'
					value={url || ''}
				/>
				<Button isLarge type='submit'>
					{__('Embed')}
				</Button>
			</form>
		</WPPlaceholder>
	);
};
