const path = require('path');

module.exports = require('babel-jest').default.createTransformer(require(path.resolve('babel.config')));
