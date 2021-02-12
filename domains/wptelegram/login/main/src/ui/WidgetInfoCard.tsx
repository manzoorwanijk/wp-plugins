import { __, sprintf } from '@wp-plugins/i18n';
import { BoxProps, Link, Stack, StackItem as StackedItem } from '@wp-plugins/adapters';
import { Code, SectionCard, Smile } from '@wp-plugins/components';
import { createInterpolateElement } from '@wp-plugins/utilities';
import { useData } from '../services';

const StackItem: React.FC<BoxProps> = (props) => {
	return (
		<StackedItem
			p='1em'
			textAlign='center'
			borderBottom='1px'
			borderBottomColor='gray.200'
			width='100%'
			{...props}
		/>
	);
};

const bodyProps = { px: 0, py: 0 };

export const WidgetInfoCard = () => {
	const { admin_url } = useData('api');

	return (
		<SectionCard title={__('Widget Info')} bodyProps={bodyProps}>
			<Stack variant='flush' spacing='1em'>
				<StackItem textAlign='start'>
					{createInterpolateElement(
						sprintf(
							/* translators: 1, 2 Menu names */
							__('Goto %1$s and click/drag %2$s and place it where you want it to be.'),
							'<Path />',
							'<Widget />'
						),
						{
							Path: (
								<>
									<b>{__('Appearance')}</b> &gt;{' '}
									<Link href={`${admin_url}/widgets.php`}>{__('Widgets')}</Link>
								</>
							),
							Widget: <b>{__('WP Telegram Login')}</b>,
						}
					)}
				</StackItem>
				<StackItem textAlign='start'>
					{__('Alternately, you can use the below shortcode or the block available in block editor.')}
				</StackItem>
				<StackItem>{__('Inside page or post content:')}</StackItem>
				<StackItem>
					<Code width='100%'>
						{'[wptelegram-login button_style="large" show_user_photo="1" corner_radius="15"]'}
					</Code>
				</StackItem>
				<StackItem>{__('Inside the theme templates')}</StackItem>
				<StackItem>
					<Code width='100%'>
						{"<?php\nif ( function_exists( 'wptelegram_login' ) ) {\n    wptelegram_login();\n}\n?>"}
					</Code>
					<br />
					<span>{__('or')}</span>
					<br />
					<Code width='100%'>
						{'<?php\n' +
							'$shortcode = \'[wptelegram-login button_style="small" show_user_photo="0" show_if_user_is="logged_in"]\';\n' +
							'echo do_shortCode( $shortcode );\n' +
							'?>'}
					</Code>
				</StackItem>
				<StackItem>
					<Smile />
				</StackItem>
			</Stack>
		</SectionCard>
	);
};
