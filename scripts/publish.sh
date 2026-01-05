#!/bin/bash
set -e

pnpm run build

PACKAGE_NAME=$(cat package.json | jq -r '.name')
PUBLISH_VERSION=$(cat package.json | jq -r '.version')
echo "Publishing ${PACKAGE_NAME}@$PUBLISH_VERSION"

ref=$1
TAG=""
if [[ "$ref" == *"testnet"* ]]; then
  TAG="--tag testnet"
elif [[ "$ref" == *"latest"* ]]; then
  TAG=""
fi

pnpm publish --access public --no-git-checks $TAG