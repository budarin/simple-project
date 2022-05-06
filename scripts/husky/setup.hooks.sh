#!/bin/sh

yarn husky install
yarn husky add .husky/prepare-commit-msg    'yarn node ./config/git/pre-commit.js';
yarn husky add .husky/pre-commit            'yarn lint-staged';
yarn husky add .husky/commit-msg            'yarn commitlint --edit $1 -g config/git/commitlint.js';
yarn husky add .husky/pre-push              'sh ./config/git/preventPushToMaster.sh';
yarn husky add .husky/post-checkout         'if [[ $3 =~ 1$ ]]; then yarn install --frozen-lockfile; fi';
yarn husky add .husky/post-merge            'yarn install --frozen-lockfile';
yarn husky add .husky/post-rebase           'yarn install';
