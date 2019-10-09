#!/usr/bin/env node
const { parse } = require('..')
const isbns = require('./generate_benchmark_isbns')

const timerKey = `parse ${isbns.length} non-hyphenated ISBNs in`

console.time(timerKey)
const data = isbns.map(parse)
console.timeEnd(timerKey)
