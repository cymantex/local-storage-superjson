#!/usr/bin/env bash

node ./scripts/updateVersion.js
./scripts/build.sh
npm publish
