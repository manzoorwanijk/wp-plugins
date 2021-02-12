const fs = require('fs');
const { listWorkspaces } = require('yarn-workspaces-list');
const { compose, filter, map, not, pick, propEq } = require('ramda');

const PATH = './workspaces.json';

listWorkspaces().then((list) => {
	let data = map(
		// use only name and location
		pick(['name', 'location']),
		filter(
			// remove the entry for workspace root
			compose(not, propEq('name', 'root')),
			list
		)
	);

	data = JSON.stringify(data, null, 4) + '\n';

	fs.writeFileSync(PATH, data);
});
