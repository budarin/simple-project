#!/bin/sh

# copy node version into ./config/babel/nodeJsVer.js
export NODE_VERSION=$(docker run -it --rm node:alpine node -v  | tr "v" "'" | tr "\r" "'");

echo "set target node version: $NODE_VERSION";

echo "module.exports = $NODE_VERSION;" > ./config/babel/nodeJsVer.js;
