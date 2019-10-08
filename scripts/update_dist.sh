#!/usr/bin/env bash
browserify ./isbn.js -s ISBN -o dist/isbn.js -t [ babelify --presets [ es2015 ] ]
uglifyjs dist/isbn.js -c -m > dist/isbn.min.js
