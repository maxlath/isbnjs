const groups = require('../groups')

module.exports = function (isbn) {
  if (isbn) {
    if (isbn.length === 10) isbn = '978' + isbn
    if (isbn.length === 13) return splitToObject(isbn)
  }

  return null
}

var splitToObject = function (isbn13) {
  var a = splitToArray(isbn13)

  if (!a || a.length !== 4) return null

  return { group: a[0], publisher: a[1], article: a[2], check: a[3] }
}

var splitToArray = function (isbn13) {
  const rec = getGroupRecord(isbn13)

  if (!rec) return null

  const { group, record } = rec
  const { ranges } = record

  var rest
  for (let key, i = 0, m = ranges.length; i < m; i += 1) {
    key = rec.rest.substr(0, ranges[i][0].length)
    if (ranges[i][0] <= key && ranges[i][1] >= key) {
      rest = rec.rest.substr(key.length)
      const publisher = key
      const article = rest.substr(0, rest.length - 1)
      const check = rest.charAt(rest.length - 1)
      return [ group, publisher, article, check ]
    }
  }

  return null
}

var getGroupRecord = function (isbn13) {
  for (let key in groups) {
    if (isbn13.match('^' + key.replace('-', '') + '(.+)')) {
      return { group: key.split('-')[1], record: groups[key], rest: RegExp.$1 }
    }
  }

  return null
}
