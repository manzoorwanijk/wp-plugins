export interface AnyObject<T = any> {
	[key: string]: T;
}

export type ParseMode = 'HTML' | 'Markdown' | 'MarkdownV2' | 'none';
