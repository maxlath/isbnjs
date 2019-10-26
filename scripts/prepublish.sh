#!/usr/bin/env bash
set -eu

# Update the dist branch
git checkout master
git checkout -B dist
npm run update-dist
git add --force ./dist
git commit --message 'update dist'
git push origin --force dist

# Update the gh-pages branch
git checkout -B gh-pages
git push origin --force gh-pages
