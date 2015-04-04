[![Build Status](https://travis-ci.org/tadas-s/isbnjs.svg?branch=master)](https://travis-ci.org/tadas-s/isbnjs)

isbnjs
====

An ISBN JavaScript Library

    npm install isbn

    ender build isbn

    var ISBN = require('isbn').ISBN;

Examples
====

[ISBN Parser Example](http://coolaj86.github.com/isbnjs/)

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
