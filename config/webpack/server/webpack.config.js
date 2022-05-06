const path = require('path');
const webpack = require('webpack');

const environment = require('../utils/wpEnvs');
const moderntInclude = require('../utils/moderntInclude');

const HappyPack = require('happypack');
const TerserPlugin = require('terser-webpack-plugin');
const { DuplicatesPlugin } = require('inspectpack/plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

require(path.resolve('src/common/utils/setupDotEnv'));

const cacheDir = path.resolve('./node_modules/.cache');
const includePaths = [path.resolve('./src')];

const contentHashedName = '[name].js'; // '[name].[contenthash].js';

module.exports = (env, argv) => {
    const config = {
        name: 'server_prod',
        watch: false,
        target: 'node',
        mode: 'production',
        devtool: 'source-map',
        cache: { type: 'filesystem' },
        entry: {
            server: [path.resolve('./src/server/index.ts')],
        },
        experiments: {
            topLevelAwait: true,
        },
        output: {
            path: path.resolve('./dist'),
            filename: contentHashedName,
            chunkFilename: contentHashedName,
            libraryTarget: 'commonjs2',
            compareBeforeEmit: true,
            environment,
        },
        optimization: {
            usedExports: true,
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    parallel: true,
                    terserOptions: {
                        mangle: false,
                        keep_classnames: true,
                        keep_fnames: true,
                        output: {
                            comments: false,
                        },
                    },
                }),
            ],
        },
        resolve: {
            extensions: ['.ts', '.js', '.json'],
            modules: ['node_modules', 'src'],
            alias: {
                ajv: path.resolve('./node_modules/ajv'),
                'fast-json-stringify@2.7.13': path.resolve('./node_modules/fast-json-stringify'),

                pino: path.resolve('./node_modules/pino'),
                long: path.resolve('./node_modules/long'),
                'json-schema-traverse': path.resolve('./node_modules/json-schema-traverse'),
            },
        },
        module: {
            rules: [
                {
                    test: /\.(ts|js)$/,
                    include: moderntInclude(includePaths),
                    exclude: /node_modules/,
                    use: 'happypack/loader?id=ts',
                },
                {
                    test: /\.json$/,
                    type: 'json',
                },
            ],
        },
        plugins: [
            new HappyPack({
                id: 'ts',
                loaders: [
                    {
                        loader: 'babel-loader',
                        options: {
                            configFile: false,
                            babelrc: false,
                            extends: path.resolve('./babel.config'),
                            cacheDirectory: path.resolve(cacheDir, 'babel_server_prod'),
                        },
                    },
                ],
            }),
            new DuplicatesPlugin({
                verbose: true,
                emitErrors: true,
            }),
            new webpack.DefinePlugin({
                __PROD__: true,
                __DEV__: false,
                // 'global.GENTLY': false, // https://github.com/node-formidable/formidable/issues/337
            }),

            // https://github.com/serverless-heaven/serverless-webpack/issues/78
            new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/ }),
            new webpack.IgnorePlugin({ resourceRegExp: /pino-pretty$/ }),

            new CircularDependencyPlugin({
                // exclude detection of files based on a RegExp
                exclude: /node_modules/,
                // add errors to webpack instead of warnings
                failOnError: true,
                // allow import cycles that include an asyncronous import,
                // e.g. via import(/* webpackMode: "weak" */ './file.js')
                allowAsyncCycles: false,
            }),
        ],
    };

    if (process.env.BUNDLE_ANALIZE === 'true') {
        const StatoscopeWebpackPlugin = require('@statoscope/webpack-plugin').default;

        config.plugins.push(
            new StatoscopeWebpackPlugin({
                name: 'Server',
                saveTo: path.resolve(`./dist/server-statoscope.html`),
                open: 'file',
            }),
        );
    }

    return config;
};
