#!/usr/bin/env zx

import { $, chalk, quiet } from 'zx';

export async function cleanCaches() {
    await quiet($`rm -rf ./node_modules/.cache`);
    await quiet($`rm -rf ./.eslintcache & rm -rf ./.tmp & rm -rf ./dist & rm -rf ./coverage`);
    console.log(chalk.green('caches are cleaned'));
}
