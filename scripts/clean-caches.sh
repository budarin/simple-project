#!/bin/sh

echo "start cleaning caches ...";

rm -rf ./node_modules/.cache
rm -rf ./.eslintcache & rm -rf ./.tmp & rm -rf ./dist & rm -rf ./coverage;