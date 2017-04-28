isbn2
=====
[![Node](https://img.shields.io/badge/node->=v6.4.0-brightgreen.svg)](http://nodejs.org)

An ISBN JavaScript Library.

Please note that this is a fork of [isbn2](https://www.npmjs.com/package/isbn2) package which was forked
[isbn](https://www.npmjs.com/package/isbn) which was forked from the
original [isbnjs](https://code.google.com/p/isbnjs/) project on Google Code.

    npm install https://github.com/maxlath/isbnjs

Motivation to fork: modularizing and updating the code for ES6, in a class-less way

Test Suite
==========

To run the lint/test suite use:

```
npm run test
```

Update Groups
=============

To get the latest ISBN groups from [isbn-international.org], use:

```
npm run get-groups
```

Results will be saved as a JavaScript object in `./groups.js`

Examples
========

```javascript
var ISBN = require('isbn2')

var isbn10a = ISBN.parse('1-933988-03-7')
isbn10a.isIsbn10                         // true
isbn10a.isIsbn13                         // false

var isbn10b = ISBN.parse('1-933988-03-7')
isbn10b.isIsbn10                       // true

var isbn13a = ISBN.parse('978-4-87311-336-4')
isbn13a.isIsbn13                         // true

var isbn13b = ISBN.parse('9781590597279')
isbn13b.isIsbn13                         // true

var foo = ISBN.parse('invalid format')   // null

ISBN.asIsbn13('4-87311-336-9')           // 9784873113364
ISBN.asIsbn10('978-4-87311-336-4', true) // 4-87311-336-9
ISBN.hyphenate('9784873113364')          // 978-4-87311-336-4

isbn13a.source                           // 978-4-87311-336-4
isbn13a.prefix                           // 978
isbn13a.group                            // 4
isbn13a.publisher                        // 87311
isbn13a.article                          // 336
isbn13a.check                            // 4
isbn13a.check10                          // 9
isbn13a.check13                          // 4
isbn13a.groupname                        // Japan
```
