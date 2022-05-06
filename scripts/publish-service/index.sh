#!/bin/sh

export "NODE_ENV"="production";
export "CI"="true";

echo 'start publishing service ...';

node ./scripts/publish-service/incAppVer.js;
sh ./scripts/publish-service/set-node-version.sh;
node ./scripts/publish-service/replace-nodever-for-github-actions.js;
sh ./scripts/build/index.sh;
sh ./scripts/publish-service/docker-publish-service.sh;
sh ./scripts/publish-service/service-upgrade.sh;
