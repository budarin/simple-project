#!/bin/sh

yarn upgrade-interactive --latest;
yarn upgrade;
yarn zx ./scripts/postinstall.mjs;
