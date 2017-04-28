const groups = require('../groups')

module.exports = function (isbn) {
  if (isbn) {
    if (isbn.length === 10) {
      isbn = '978' + isbn
    }

    if (isbn.length === 13) {
      return splitToObject(isbn)
    }
  }

  return null
}

var splitToArray = function (isbn13) {
  var rec
  var key
  var rest
  var i
  var m

  rec = getGroupRecord(isbn13)
  if (!rec) {
    return null
  }

  for (key, i = 0, m = rec.record.ranges.length; i < m; i += 1) {
    key = rec.rest.substr(0, rec.record.ranges[i][0].length)
    if (rec.record.ranges[i][0] <= key && rec.record.ranges[i][1] >= key) {
      rest = rec.rest.substr(key.length)
      return [rec.group, key, rest.substr(0, rest.length - 1), rest.charAt(rest.length - 1)]
    }
  }

  return null
}

var splitToObject = function (isbn13) {
  var a = splitToArray(isbn13)

  if (!a || a.length !== 4) {
    return null
  }

  return {group: a[0], publisher: a[1], article: a[2], check: a[3]}
}

var getGroupRecord = function (isbn13) {
  var key
  for (key in groups) {
    if (isbn13.match('^' + key.replace('-', '') + '(.+)')) {
      return {group: key.split('-')[1], record: groups[key], rest: RegExp.$1}
    }
  }

  return null
}
