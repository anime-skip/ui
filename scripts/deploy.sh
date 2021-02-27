#!/bin/bash
./scripts/build.sh

pushd lib
npm publish
popd
