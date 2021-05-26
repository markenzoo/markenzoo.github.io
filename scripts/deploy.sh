#!/usr/bin/env sh

# abort on errors
set -e

dir=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)

cd "$dir" || exit 1

export $(grep -v '^#' .env | xargs)

# build
yarn docs:build

# navigate into the build output directory
cd docs/.vitepress/dist

rsync -avz --delete ./ ${SSH_USER}@${SSH_HOST}:${DEPLOY_PATH}/

cd -