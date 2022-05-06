#!/bin/sh

export "NODE_ENV"="production";

sh ./scripts/build.sh;
clear;
node ./dist/server.js