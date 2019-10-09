#!/usr/bin/env node

// To compare with isbn2 use, run `npm i --no-save isbn2`
// and replace the following line by:
// const { parse } = require('isbn2').ISBN
const { parse } = require('..')

const isbns = require('./generate_benchmark_isbns')

const timerKey = `parsed ${isbns.length} non-hyphenated ISBNs in`

console.time(timerKey)

// Wrapper function needed for running with isbn2 parse function
// which would interpret the map second argument as a group whitelist
const data = isbns.map(isbn => parse(isbn))

console.timeEnd(timerKey)
