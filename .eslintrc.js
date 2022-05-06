module.exports = {
    env: {
        'jest/globals': true,
        browser: true,
        node: true,
        es6: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:jest/recommended',
        'plugin:jest/style',
        'plugin:node/recommended',
        'plugin:security/recommended',
    ],
    settings: {
        react: {
            version: 'detect',
        },
        node: {
            resolvePaths: [__dirname],
            tryExtensions: ['ts', '.js', '.json', '.node'],
        },
    },
    globals: {
        __PROD__: 'readonly',
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        createDefaultProgram: true,
        project: 'tsconfig.json',
        tsconfigRootDir: '.',
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2019,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin', 'jest', 'fp', 'deprecate', 'promise', 'security'],
    // sample rules https://gist.github.com/BoresXP/e404f16a0e153eeb6ce15ce06848f36e
    rules: {
        'node/no-unsupported-features/node-builtins': [
            'error',
            {
                ignores: ['perf_hooks'],
            },
        ],
        '@typescript-eslint/require-await': 'warn',
        '@typescript-eslint/no-unsafe-assignment': 'warn',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/ban-ts-ignore': 'off',
        complexity: ['warn', 5],
        'max-lines': ['warn', { max: 200, skipBlankLines: true }],
        'max-depth': ['warn', 3],
        'max-nested-callbacks': ['warn', 3],
        'max-lines-per-function': ['warn', { max: 30, skipBlankLines: true }],
        'no-param-reassign': 'warn',
        'max-params': ['warn', 3],
        'fp/no-let': 'off',
        'fp/no-loops': 'warn',
        'fp/no-throw': 'off',
        'fp/no-mutating-assign': 'warn',
        'fp/no-mutating-methods': 'warn',
        'fp/no-mutation': 'off',
        'fp/no-delete': 'warn',
        'deprecate/function': ['warn', { name: 'legacyFunc', use: 'newFunc from this package' }],
        // node rules
        'node/no-unsupported-features/es-builtins': 'off',
        'node/no-unsupported-features/es-syntax': 'off',
        'node/no-missing-import': 'off',
        'no-native-reassign': ['error', { exceptions: ['Redis.Promise'] }],
        'no-process-exit': 'off',
        'security/detect-object-injection': 'off',
    },
};
