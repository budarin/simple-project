const fs = require('fs');
const path = require('path');

const majorNodeVer = fs
    .readFileSync(path.resolve('./config/babel/nodeJsVer.js'), 'utf8')
    .match(/.+'(.+)'/)[1]
    .split('.')[0];

const githubScriptPath = path.resolve('./.github/workflows/nodejs.yml');
const re = /node-version: '(.+)'/m;
const newYml = fs.readFileSync(githubScriptPath, 'utf8').replace(re, `node-version: '${majorNodeVer}'`);

fs.writeFileSync(githubScriptPath, newYml, { encoding: 'utf8' });
