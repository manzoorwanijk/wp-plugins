import { Button } from '@wordpress/components';
import { TelegramIcon } from './TelegramIcon';

export const JoinButton: React.FC<any> = ({ link, text, isEditing }) => {
	return (
		<Button
			isLarge
			href={link}
			className='join-link'
			icon={<TelegramIcon />}
			target={isEditing ? '_blank' : null}
			rel='noopener noreferrer'
		>
			{text}
		</Button>
	);
};
