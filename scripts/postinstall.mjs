#!/usr/bin/env zx

import { $, chalk, fs } from 'zx';
import { cleanCaches } from './utils/cleanCaches.mjs';

$.verbose = false;
process.env.CI = 'false';

await cleanCaches();

console.log(chalk.green('postinstalling...'));

await $`husky install`;

const { dependencies: projectDeps } = await fs.readJson('./package.json');
const coreJsVer = projectDeps['core-js'];

await fs.outputFile(
    './config/babel/coreJsVer.js',
    `module.exports = '${coreJsVer}';
`,
);

// Устанавливаем теже версии Ajv и fast-json-stringify что и в Fastify
// try {
//     const ajv = projectDeps['ajv'];
//     const { dependencies: pkgDeps } = await fs.readJSON('./node_modules/@fastify/ajv-compiler/package.json');
//     const pkgAjv = pkgDeps['ajv'];

//     console.log(pkgAjv, ajv);

//     if (ajv === undefined || pkgAjv.includes(ajv) == false) {
//         console.log(chalk.yellowBright(`${ajv ? 'upgrading' : 'installing'} Ajv@${pkgAjv} ...`));

//         try {
//             ajv && (await $`yarn remove ajv`);
//         } catch (error) {}

//         await $`yarn add ajv@${pkgAjv}`;
//     }
// } catch (error) {
//     console.log(error);
//     console.log(chalk.yellowBright('Ajv is not found'));
// }

// try {
//     const fast = projectDeps['fast-json-stringify'];
//     const { dependencies: pkgDeps } = await fs.readJSON('./node_modules/fastify/package.json');
//     const pkgFast = pkgDeps['fast-json-stringify'];

//     console.log(pkgFast, fast);

//     if (fast === undefined || pkgFast.includes(fast) == false) {
//         console.log(chalk.yellowBright(`${fast ? 'upgrading' : 'installing'} fast-json-stringify@${pkgFast} ...`));

//         try {
//             fast && (await $`yarn remove fast-json-stringify`);
//         } catch (error) {}

//         await $`yarn add fast-json-stringify@${pkgFast}`;
//     }
// } catch (error) {
//     console.log(error);
//     console.log(chalk.yellowBright('fast-json-stringify is not found'));
// }
