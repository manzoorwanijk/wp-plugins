/* eslint-disable */

const fs = require('fs');
const R = require('ramda');

/**
 * Filter predicate, returning true if the given base file name is to be
 * included in the build.
 */
const isPackage = R.allPass([R.has('location'), R.propSatisfies(R.startsWith('packages/'), 'location')]);
const isDomain = R.allPass([R.has('location'), R.propSatisfies(R.startsWith('domains/'), 'location')]);

/**
 * Get all the workspaces.
 *
 * @return {Array<Record<'name' | 'location', string>>} Package names
 */
const getWorkspaces = () => {
	return JSON.parse(fs.readFileSync('./workspaces.json'));
};

/**
 * Returns the all packages
 *
 * @return {Array<Record<'name' | 'location', string>>} Packages
 */
const getPackages = () => {
	const workspaces = getWorkspaces();
	return R.filter(isPackage, workspaces);
};

/**
 * Returns the all domains
 *
 * @return {Array<Record<'name' | 'location', string>>} Domains
 */
const getDomains = () => {
	const workspaces = getWorkspaces();
	return R.filter(isDomain, workspaces);
};

module.exports = {
	getDomains,
	getPackages,
};
