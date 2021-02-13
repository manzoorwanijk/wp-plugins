const R = require('ramda');
const { getDomains, getPackages } = require('./workspaces');

const WORDPRESS_NAMESPACE = '@wordpress/';

/* Parts of this code are copied from WP Gutenberg */

/**
 * Request to global transformation
 *
 * Transform @wordpress dependencies:
 *
 * @type {import('.').RequestToExternal}
 */
function requestToExternal(request) {
	switch (request) {
		case 'jquery':
			return 'jQuery';

		case 'react':
			return 'React';

		case 'react-dom':
			return 'ReactDOM';
	}

	if (request.startsWith(WORDPRESS_NAMESPACE)) {
		return ['wp', camelCaseDash(request.substring(WORDPRESS_NAMESPACE.length))];
	}
}

/**
 * Request to WordPress script handle transformation
 *
 * Transform @wordpress dependencies
 *
 * @type {import('.').RequestToHandle}
 */
function requestToHandle(request) {
	if (request.startsWith(WORDPRESS_NAMESPACE)) {
		return 'wp-' + request.substring(WORDPRESS_NAMESPACE.length);
	}
}

/**
 * Given a string, returns a new string with dash separators converted to
 * camelCase equivalent.
 *
 * @param {string} string Input dash-delimited string.
 *
 * @return {string} Camel-cased string.
 */
function camelCaseDash(string) {
	return string.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Get args from CLI to watch only the domains specified during dev
 * All domains in production and all packages are watched by default
 * Domain names should match their corresponding directory names
 * Example commands:
 * - `yarn dev --domains "wptelegram--main,wptelegram--blocks"`
 */
let { domains: suppliedDomains } = getCommandArgs();

/**
 * Returns the all domains
 *
 * @return {Array<Record<'name' | 'location', string>>} Domains to watch
 */
const getDomainsToWatch = () => {
	const allDomains = R.map(R.over(R.lensProp('name'), R.replace('@wp-plugins/', '')), getDomains());
	// watch all domains by default
	let domainsToWatch = allDomains;

	if (suppliedDomains && typeof suppliedDomains === 'string') {
		domainsToWatch = [];

		const domainLocations = commaStrToArray(suppliedDomains);

		for (const domain of allDomains) {
			const domainLocation = R.prop('location', domain);
			const isDomainInPath = R.flip(R.includes)(domainLocation);
			if (R.any(isDomainInPath, domainLocations)) {
				domainsToWatch.push(domain);
			}
		}
		if (!domainsToWatch.length) {
			throw new Error('No matching domains found');
		}
	}

	return domainsToWatch;
};

/**
 * Returns the paths of all the domains
 *
 * @return {Array<string>} Paths
 */
const getPackagePaths = () => {
	return getPackages().map(R.prop('location'));
};

/**
 * Gets CLI args as object.
 */
function getCommandArgs() {
	const argList = process.argv;

	const arg = {};
	let a, opt, thisOpt, curOpt;
	for (a = 0; a < argList.length; a++) {
		thisOpt = argList[a].trim();
		opt = thisOpt.replace(/^-+/, '');

		if (opt === thisOpt) {
			// argument value
			if (curOpt) {
				arg[curOpt] = opt;
			}
			curOpt = null;
		} else {
			// argument name
			curOpt = opt;
			arg[curOpt] = true;
		}
	}
	return arg;
}

/**
 * Converts a comma separated string values to array
 * "ab, cd,ef " => ["ab", "cd", "ef"]
 *
 * @param {string[]} str
 */
function commaStrToArray(str = '') {
	return R.map(R.trim, R.split(',', str)).filter(Boolean);
}

module.exports = { getDomainsToWatch, getPackagePaths, requestToExternal, requestToHandle };
