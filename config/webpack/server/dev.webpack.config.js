const os = require('os');
const path = require('path');
const webpack = require('webpack');

const environment = require('../utils/wpEnvs');

const nodeExternals = require('webpack-node-externals');
const { DuplicatesPlugin } = require('inspectpack/plugin');
const UnusedFilesWebpackPlugin = require('webpack-deadcode-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

require(path.resolve('src/common/utils/setupDotEnv'));

const hmrWpString = 'webpack/hot/poll?1000';
const includePaths = [path.resolve('./src')];
const cacheDir = path.resolve('./node_modules/.cache');

module.exports = {
    name: 'server_dev',
    watch: true,
    cache: { type: 'filesystem' },
    target: 'node',
    profile: false,
    mode: 'development',
    devtool: 'inline-source-map',
    entry: [path.resolve('./src/server/index.ts')],
    experiments: {
        topLevelAwait: true,
    },
    output: {
        path: path.resolve('./dist'),
        filename: 'server.js',
        chunkFilename: '[name].js',
        libraryTarget: 'commonjs2',
        compareBeforeEmit: true,
        environment,
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        modules: ['node_modules', 'src'],
        alias: {},
    },
    externals: [
        nodeExternals({
            allowlist: [hmrWpString],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(ts|js)$/,
                include: includePaths,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            configFile: false,
                            babelrc: false,
                            extends: path.resolve('./babel.config'),
                            cacheDirectory: path.resolve(cacheDir, 'babel_server_dev'),
                        },
                    },
                ],
            },
            {
                test: /\.json$/,
                type: 'json',
            },
        ],
    },
    plugins: [
        new RunScriptWebpackPlugin({
            name: 'server.js',
            // nodeArgs: [], //'--inspect'
            signal: 'SIGINT', //os.platform() !== 'win32',
        }),
        // new webpack.DefinePlugin({
        //     __DEV__: true,
        //     __PROD__: false,
        // }),
        // new UnusedFilesWebpackPlugin({
        //     patterns: ['src/**/*.(ts|js|json|css)'],
        //     exclude: [
        //         '**/*.d.ts',
        //         '**/*.(stories|spec|test).(ts|js)',
        //         '**/jest.config.js',
        //         '**/jest-config/**',
        //         '**/*.preval.js',
        //         '**/setupDotEnv.js',
        //     ],
        // }),
        // new DuplicatesPlugin({
        //     verbose: true,
        //     emitErrors: false,
        // }),
        // new CircularDependencyPlugin({
        //     // exclude detection of files based on a RegExp
        //     exclude: /node_modules/,
        //     // add errors to webpack instead of warnings
        //     failOnError: true,
        //     // allow import cycles that include an asyncronous import,
        //     // e.g. via import(/* webpackMode: "weak" */ './file.js')
        //     allowAsyncCycles: false,
        // }),
    ],
};
