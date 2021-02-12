const R = require('ramda');

const { getDomains, getPackages } = require('./workspaces');

/**
 * Get args from CLI to watch only the domains specified during dev
 * All domains in production and all packages are watched by default
 * Domain names should match their corresponding directory names
 * Example commands:
 * - `yarn dev --domains "wptelegram,blocks"`
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
		console.log('allDomains', allDomains);
		const domainNameIndex = R.indexBy(R.prop('name'), allDomains);

		domainsToWatch = [];

		const domains = commaStrToArray(suppliedDomains);
		for (const domain of domains) {
			if (!(domain in domainNameIndex)) {
				throw new Error('Unknown domain: ' + domain);
			}
			domainsToWatch.push(domainNameIndex[domain]);
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

module.exports = { getDomainsToWatch, getPackagePaths };
