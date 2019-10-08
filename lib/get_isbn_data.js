const fill = require('./fill')
const splitIsbnParts = require('./split_isbn_parts')

module.exports = function (val) {
  var data
  var source = val

  // Recover bad hyphens (a rather current formatting mistake)
  if (val.length === 14 && val.match(/^(978|979)-(\d{9}[\dX]$)/)) {
    val = val.replace(/-/g, '')
  }

  // looks like an isbn10
  if (val.length === 10 && val.match(/^\d{9}[\dX]$/)) {
    data = Object.assign({
      source: source,
      isIsbn10: true,
      isIsbn13: false
    }, splitIsbnParts(val))
  }

  // looks like an isbn10h
  if (val.length === 13 && val.match(/^(\d+)-(\d+)-(\d+)-([\dX])$/)) {
    data = {
      source: source,
      isIsbn10: true,
      isIsbn13: false,
      group: RegExp.$1,
      publisher: RegExp.$2,
      article: RegExp.$3,
      check: RegExp.$4
    }
  }

  // looks like an isbn13
  if (val.length === 13 && val.match(/^(978|979)(\d{9}[\dX])$/)) {
    data = Object.assign({
      source: source,
      isIsbn10: false,
      isIsbn13: true,
      prefix: RegExp.$1
    }, splitIsbnParts(val))
  }

  // looks like an isbn13h
  if (val.length === 17 && val.match(/^(978|979)-(\d+)-(\d+)-(\d+)-([\dX])$/)) {
    data = {
      source: source,
      isIsbn10: false,
      isIsbn13: true,
      prefix: RegExp.$1,
      group: RegExp.$2,
      publisher: RegExp.$3,
      article: RegExp.$4,
      check: RegExp.$5
    }
  }

  if (data) {
    data = fill(data)
    if (data) {
      data.isValid = true
      return data
    }
  }

  return null
}
