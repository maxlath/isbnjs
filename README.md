# isbn3

[![Node](https://img.shields.io/badge/node->=v6.4.0-brightgreen.svg)](http://nodejs.org)

An ISBN JavaScript Library.

Please note that this is a fork of [isbn2](https://www.npmjs.com/package/isbn2), which was a fork of [isbn](https://www.npmjs.com/package/isbn) package which was forked from the original [isbnjs](https://code.google.com/p/isbnjs/) project on Google Code.

Motivations to fork:
* modularizing and updating the code for ES6, in a class-less way.
* improve performance (see [#benchmark])

[Demo](http://inventaire.github.io/isbn3/)

## Summary

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Install](#install)
- [Functions](#functions)
  - [parse](#parse)
  - [asIsbn13](#asisbn13)
  - [asIsbn10](#asisbn10)
  - [hyphenate](#hyphenate)
  - [groups](#groups)
- [CLI](#cli)
- [Benchmark](#benchmark)
- [Development](#development)
  - [Test Suite](#test-suite)
  - [Update Groups](#update-groups)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Install

From the command line:
```sh
npm install isbn3
```

Then in your JS file:

```js
const ISBN = require('isbn3')
```

Alternatively, you can call the ES5 browserified version of the module from an HTML file, which sets the module object on `window.ISBN`:
```html
<script type="application/javascript" src="./node_modules/dist/isbn.js"></script>
```

See `./index.html` or the [live demo](http://inventaire.github.io/isbn3/) for an example.

## Functions

### parse

```js
ISBN.parse('1-933988-03-7')
// => {
// source: '1-933988-03-7',
// isValid: true,
// isIsbn10: true,
// isIsbn13: false,
// group: '1',
// publisher: '933988',
// article: '03',
// check: '7',
// isbn13: '9781933988030',
// isbn13h: '978-1-933988-03-0',
// check10: '7',
// check13: '0',
// groupname: 'English language',
// isbn10: '1933988037',
// isbn10h: '1-933988-03-7'
// }

ISBN.parse('1933988037')
// => idem but with source === '1933988037'

ISBN.parse('978-4-87311-336-4')
// => {
//   source: '978-4-87311-336-4',
//   isValid: true,
//   isIsbn10: false,
//   isIsbn13: true,
//   prefix: '978',
//   group: '4',
//   publisher: '87311',
//   article: '336',
//   check: '4',
//   isbn13: '9784873113364',
//   isbn13h: '978-4-87311-336-4',
//   check10: '9',
//   check13: '4',
//   groupname: 'Japan',
//   isbn10: '4873113369',
//   isbn10h: '4-87311-336-9'
// }

ISBN.parse('9784873113364')
// => idem but with source === '9784873113364'

ISBN.parse('978-4873113364')
// => idem but with source === '978-4873113364'

ISBN.parse('979-10-96908-02-8')
// {
//   source: '979-10-96908-02-8',
//   isValid: true,
//   isIsbn10: false,
//   isIsbn13: true,
//   prefix: '979',
//   group: '10',
//   publisher: '96908',
//   article: '02',
//   check: '8',
//   isbn13: '9791096908028',
//   isbn13h: '979-10-96908-02-8',
//   check10: '6',
//   check13: '8',
//   groupname: 'France'
// }

ISBN.parse('not an isbn')
// => null
```

### asIsbn13
```js
ISBN.asIsbn13('4-87311-336-9')           // 9784873113364
ISBN.asIsbn13('4-87311-336-9', true)     // 978-4-87311-336-4
```

### asIsbn10
```js
ISBN.asIsbn10('978-4-87311-336-4')       // 4873113369
ISBN.asIsbn10('978-4-87311-336-4', true) // 4-87311-336-9
```

### hyphenate
```js
ISBN.hyphenate('9784873113364')          // 978-4-87311-336-4
```

### groups
```js
ISBN.groups['978-99972']
// => {
//   name: 'Faroe Islands',
//   ranges: [ [ '0', '4' ], [ '50', '89' ], [ '900', '999' ] ]
// }
```

## CLI
Installing the module globally (`npm install -g isbn3`) will make an `isbn` command available from your terminal.
If you installed locally (`npm install isbn3`), the command can be accessed from the project directory at `./node_modules/.bin/isbn`

So, from the terminal:
```sh
isbn <isbn> <format>

Valid ISBN input examples:
- 9781491574317
- 978-1-4915-7431-7
- 978-1491574317
- isbn:9781491574317
- 9781-hello-491574317

Formats:
- h: hyphen
- n: no hyphen
- 13: ISBN-13 without hyphen
- 13h: ISBN-13 with hyphen (default)
- 10: ISBN-10 without hyphen
- 10h: ISBN-10 with hyphen
- prefix, group, publisher, article, check, check10, check13: output ISBN part value
- data: output all this data as JSON
```

## Benchmark
Indicative benchmark, nothing super scientific, YMMV.

Running `npm run benchmark` on some Linux machine with Node.Js `v8.12`:
- isbn2 parses 4960 non-hyphenated ISBNs in around 285ms
- isbn3 parses 4960 non-hyphenated ISBNs in around 110ms

## Development

### Test Suite

To run the lint/test suite use:

```sh
npm test
```

### Update Groups

To get the latest ISBN groups from [isbn-international.org], use:

```sh
npm run get-groups
```

Results will be saved as a JavaScript object in `./groups.js`
