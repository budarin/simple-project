const coreJsVer = require('./config/babel/coreJsVer');
const nodeJsVer = require('./config/babel/nodeJsVer');

const isCI = Boolean(process.env.CI);
const isTesting = process.env.NODE_ENV === 'test';
const isDev = process.env.NODE_ENV === 'development';

const targets = { node: isDev || isCI ? 'current' : nodeJsVer };

module.exports = function (api) {
    api.cache.using(() => process.env.NODE_ENV);

    return {
        comments: true,
        presets: [
            [
                '@babel/preset-env',
                {
                    loose: true,
                    debug: false,
                    modules: isTesting ? 'commonjs' : false,
                    corejs: {
                        version: coreJsVer,
                        proposals: true,
                    },
                    useBuiltIns: 'usage',
                    targets,
                    bugfixes: true,
                },
            ],
            '@babel/typescript',
        ],
        plugins: ['transform-promise-to-bluebird', 'transform-remove-console'],
        env: {
            production: {
                plugins: [
                    'babel-plugin-transform-imports',
                    'babel-plugin-react-local',
                    // '@babel/plugin-transform-react-constant-elements',
                    [
                        'strip-function-call',
                        {
                            strip: [
                                // 'useWhyDidYouRender'
                            ],
                        },
                    ],
                ],
                ignore: ['**/*.test.tsx', '**/*.test.ts', '__snapshots__', '__tests__'],
            },
            development: {
                plugins: [],
                ignore: ['**/*.test.tsx', '**/*.test.ts', '__snapshots__', '__tests__'],
            },
            test: {
                ignore: ['__snapshots__'],
            },
        },
    };
};
