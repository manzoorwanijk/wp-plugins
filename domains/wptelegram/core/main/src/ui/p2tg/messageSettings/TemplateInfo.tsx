import { Fragment } from 'react';

import { __, isRTL, sprintf } from '@wp-plugins/i18n';
import { Box, Text, Link } from '@wp-plugins/adapters';
import { Collapse, Code } from '@wp-plugins/components';
import { createInterpolateElement } from '@wp-plugins/utilities';

import { useData } from '../../../services';

export const TemplateInfo: React.FC = () => {
	const macro_groups = useData('uiData').macros;

	return (
		<Collapse
			title={sprintf(
				'%s %s',
				isRTL() ? '👈' : '👉',
				__('You can use any text, emojis or these macros in any order.')
			)}
		>
			<Box>
				<Text>
					<b>{__('You can also use conditional logic in the template.')}</b>
					&nbsp;
					<Link href='https://www.youtube.com/watch?v=rAFCY4haTiM' color='blue.500' isExternal>
						{__('Learn more')}
					</Link>
				</Text>
				<table className='form-table'>
					<tbody>
						{Object.values(macro_groups).map((group, i) => {
							const { label, macros = [], info } = group;
							return (
								<Fragment key={i}>
									<tr>
										<th>{label}</th>
										<td>
											{macros.map((macro, key) => {
												return <Code key={key}>{macro}</Code>;
											})}
										</td>
									</tr>
									{info ? (
										<tr>
											<td colSpan={2}>
												<span>{createInterpolateElement(info, { code: <Code /> })}</span>
											</td>
										</tr>
									) : null}
								</Fragment>
							);
						})}
					</tbody>
				</table>
			</Box>
		</Collapse>
	);
};
