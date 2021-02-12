export const insertScript = (id: string, src: string): void => {
	const fjs = document.getElementsByTagName('script')[0];
	if (document.getElementById(id)) return;
	const js = document.createElement('script');
	js.id = id;
	js.setAttribute('src', src);
	fjs.parentNode.insertBefore(js, fjs);
};

/**
 * converts dot and bracket syntax path to ramda path, i.e.
 * 'people[1].address[0].phones[0].code'
 * to
 * ["people", "1", "address", "0", "phones", "0", "code"]
 */
export const strToPath = (str: string): Array<string> => str.split(/[[\].]+/);

export const sleep = (milliseconds = 0) => new Promise((resolve) => setTimeout(resolve, milliseconds));
