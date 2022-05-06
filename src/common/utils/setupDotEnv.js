/* eslint-disable @typescript-eslint/no-var-requires */

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const isRunInContainer = require('./isRunInContainer');

// const { log } = console;
// log('isRunInContainer', isRunInContainer);

if (isRunInContainer === false) {
    const fs = require('fs');
    const path = require('path');
    const { config } = require('dotenv');

    const getEnvPath = () => {
        switch (process.env['NODE_ENV']) {
            case 'test':
                return './.env.test';
            case 'production':
                return './.env.prod';
            default:
                return './.env.dev';
        }
    };

    const envPath = path.resolve(getEnvPath());

    // log(envPath);

    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const isEnvExists = fs.existsSync(envPath);
    const { error } = config({ path: envPath });

    if (error && isEnvExists) {
        throw error;
    }
}
