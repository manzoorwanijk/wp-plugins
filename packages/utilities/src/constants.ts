export const BOT_TOKEN_REGEX = /^\d{9,11}:[a-z0-9_-]{35}$/i;

export const TG_USERNAME_REGEX = /^[a-z][a-z0-9_]{3,30}[a-z0-9]$/i;

// match @username and chat ID
export const TG_CHAT_ID_REGEX = /^(@?[a-z][a-z0-9_]{3,30}[a-z0-9]|-?[1-9][0-9]{6,20})$/i;

export const FORM_ERROR = 'form/error';

export const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
