import { AnyObject } from '@wp-plugins/utilities';

export const getErrorStrings = (errors: AnyObject): Array<string> => {
	const bucket = [];
	mineErrorStrings(errors, bucket);
	return bucket;
};

const mineErrorStrings = (error: AnyObject, bucket: Array<string>) => {
	if ('object' === typeof error) {
		for (const key in error) {
			mineErrorStrings(error[key], bucket);
		}
	} else if ('string' === typeof error && !bucket.includes(error)) {
		bucket.push(error);
	}
};
