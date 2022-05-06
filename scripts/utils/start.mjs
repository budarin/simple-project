#!/usr/bin/env zx

import { cleanCaches } from './cleanCaches.mjs';

// $.verbose = false;

process.env.NODE_ENV = 'development';

await cleanCaches();
$`yarn webpack --config  ./config/webpack/dev.webpack.config.js`.pipe(process.stdout);
