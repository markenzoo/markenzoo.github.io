#!/usr/bin/env sh

# abort on errors
set -e

dir=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)

cd "$dir" || exit 1

# build
yarn docs:build

# navigate into the build output directory
cd docs/.vitepress/dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:markenzoo/markenzoo.github.io.git master

cd -