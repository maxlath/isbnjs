[![Build Status](https://travis-ci.org/tadas-s/isbnjs.svg?branch=master)](https://travis-ci.org/tadas-s/isbnjs)

isbn2
=====

An ISBN JavaScript Library.

Please note that this is a fork of [isbn](https://www.npmjs.com/package/isbn) package which was forked from the
original [isbnjs](https://code.google.com/p/isbnjs/) project on Google Code.

    npm install isbn2
    
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

Results will be saved as a JavaScript object in a `groups.js` file that can
used to update the `isbn.js` 

Examples
========
    var ISBN = require('isbn2').ISBN;

    var isbn10a = ISBN.parse('4873113369');
    isbn10a.isIsbn10();                       // true
    isbn10a.isIsbn13();                       // false
    isbn10a.asIsbn10();                       // 4873113369
    isbn10a.asIsbn10(true);                   // 4-87311-336-9
    isbn10a.asIsbn13();                       // 9784873113364
    isbn10a.asIsbn13(true);                   // 978-4-87311-336-4

    var isbn10b = ISBN.parse('1-933988-03-7');
    isbn10b.isIsbn10();                       // true

    var isbn13a = ISBN.parse('978-4-87311-336-4');
    isbn13a.isIsbn13();                       // true

    var isbn13b = ISBN.parse('9781590597279');
    isbn13b.isIsbn13();                       // true

    var foo = ISBN.parse('invalid format');   // null
    ISBN.asIsbn13('4-87311-336-9');           // 9784873113364
    ISBN.asIsbn10('978-4-87311-336-4', true); // 4-87311-336-9
    ISBN.hyphenate('9784873113364');          // 978-4-87311-336-4
    isbn13a.codes.source;                     // 978-4-87311-336-4
    isbn13a.codes.prefix;                     // 978
    isbn13a.codes.group;                      // 4
    isbn13a.codes.publisher;                  // 87311
    isbn13a.codes.article;                    // 336
    isbn13a.codes.check;                      // 4
    isbn13a.codes.check10;                    // 9
    isbn13a.codes.check13;                    // 4
    isbn13a.codes.groupname;                  // Japan
