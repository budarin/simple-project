#!/bin/sh

export "NODE_ENV"="test";
export "LOG_LEVEL"="silent";

yarn jest --changedFilesWithAncestor --testTimeout=5000;
