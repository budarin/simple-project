#!/bin/sh

export "NODE_ENV"="development";

sh ./scripts/clean-caches.sh;
yarn webpack --config  ./config/webpack/server/dev.webpack.config.js;
