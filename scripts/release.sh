#!/usr/bin/env bash

node ./scripts/updateVersion.js
./scripts/build.sh
cd dist || exit
npm publish
