const fs = require('fs');
const path = require('path');

const pkjPath = path.resolve('./package.json');
const pkj = require(pkjPath);

const prevVersion = pkj.version;
const versionArray = prevVersion.split('.');
const lastItemIndex = versionArray.length - 1;
const newVer = parseInt(versionArray[lastItemIndex], 10) + 1;
versionArray[lastItemIndex] = newVer;

pkj.version = versionArray.join('.');

console.log('increase app version to:', pkj.version);

fs.writeFileSync(pkjPath, JSON.stringify(pkj, null, 4), { encoding: 'utf8' });
