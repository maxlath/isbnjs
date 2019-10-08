const fill = require('./fill')
const merge = require('./merge')
const split = require('./split')

module.exports = function (val) {
  var data
  var source = val

  // Recover bad hyphens (a rather current formatting mistake)
  if (val.length === 14 && val.match(/^(978|979)-(\d{9}[\dX]$)/)) {
    val = val.replace(/-/g, '')
  }

  // looks like an isbn10
  if (val.length === 10 && val.match(/^\d{9}[\dX]$/)) {
    data = {
      source: source,
      isValid: true,
      isIsbn10: true,
      isIsbn13: false
    }
    return fill(merge(data, split(val)))
  }

  // looks like an isbn10h
  if (val.length === 13 && val.match(/^(\d+)-(\d+)-(\d+)-([\dX])$/)) {
    data = {
      source: source,
      isValid: true,
      isIsbn10: true,
      isIsbn13: false,
      group: RegExp.$1,
      publisher: RegExp.$2,
      article: RegExp.$3,
      check: RegExp.$4
    }
    return fill(data)
  }

  // looks like an isbn13
  if (val.length === 13 && val.match(/^(978|979)(\d{9}[\dX]$)/)) {
    data = {
      source: source,
      isValid: true,
      isIsbn10: false,
      isIsbn13: true,
      prefix: RegExp.$1
    }
    return fill(merge(data, split(RegExp.$1 + RegExp.$2)))
  }

  // looks like an isbn13h
  if (val.length === 17 && val.match(/^(978|979)-(\d+)-(\d+)-(\d+)-([\dX])$/)) {
    data = {
      source: source,
      isValid: true,
      isIsbn10: false,
      isIsbn13: true,
      prefix: RegExp.$1,
      group: RegExp.$2,
      publisher: RegExp.$3,
      article: RegExp.$4,
      check: RegExp.$5
    }
    return fill(data)
  }

  return null
}
