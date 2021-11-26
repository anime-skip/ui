#!/bin/bash
pnpm build

pushd lib
npm publish
popd
