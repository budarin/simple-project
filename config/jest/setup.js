const path = require('path');

const loadEnvs = () => require(path.resolve('src/common/utils/setupDotEnv'));

module.exports = loadEnvs;
