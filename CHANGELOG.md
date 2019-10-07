$# CHANGELOG
*versions follow [SemVer](http://semver.org)*

## 1.0.0 - 2019-10-07
Fork from [isbn2](https://www.npmjs.com/package/isbn2)

**BREAKING CHANGES**
* accept approximately formatted ISBNs such as '978-4873113364' that would previously have return a `null` result
* functions are now directly exposed on the module object:
```js
require('isbn2').ISBN.parse('1933988037').codes.isbn13h // => '978-1-933988-03-0'
// becomes
require('isbn3').parse('1933988037').isbn13h // => '978-1-933988-03-0'
```

** Added features**
* added a [command-line interface](https://github.com/maxlath/isbnjs#CLI)
* [expose groups data on the module object](https://github.com/maxlath/isbnjs#groups)
* recover common hyphenization mistake `979-1091146135`
