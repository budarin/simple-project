#!/bin/sh

export "NODE_ENV"="production";

sh ./scripts/clean-caches.sh;
yarn webpack --config  ./config/webpack/webpack.config.js
