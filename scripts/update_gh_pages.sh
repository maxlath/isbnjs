#!/usr/bin/env bash
git checkout master
git checkout -B gh-pages
npm run build-dist
mkdir -p ./dist
git add -f ./dist
git commit -m 'update gh-pages'
git push origin -f gh-pages
git checkout master
