#!/usr/bin/env sh

cd client

yarn
yarn build

cd dist

git init
git checkout -b main
git add -A
git commit -m 'deploy'

git push -f git@github.com:jack-cooper/football-results.git main:gh-pages