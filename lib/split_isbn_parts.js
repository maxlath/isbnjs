const groups = require('./groups')

module.exports = function (isbn) {
  if (isbn) {
    if (isbn.length === 10) isbn = '978' + isbn
    if (isbn.length === 13) return splitToObject(isbn)
  }

  return null
}

var splitToObject = function (isbn13) {
  const groupRecord = getGroupRecord(isbn13)

  if (!groupRecord) return null

  const { group, ranges, restAfterGroup } = groupRecord

  for (let range of ranges) {
    const [ min, max ] = range
    const publisher = restAfterGroup.substr(0, min.length)
    // Warning: comparing strings: seems to be ok as ranges boundaries are of the same length
    // and we are testing a publisher code of that same length
    // (so there won't be cases of the kind '2' > '199' === true)
    if (min <= publisher && max >= publisher) {
      const restAfterPublisher = restAfterGroup.substr(publisher.length)
      return {
        group,
        publisher,
        article: restAfterPublisher.slice(0, -1),
        check: restAfterPublisher.slice(-1)
      }
    }
  }

  return null
}

var getGroupRecord = function (isbn13) {
  // TODO: refactor with a group hash
  for (let key in groups) {
    if (isbn13.match('^' + key.replace('-', '') + '(.+)')) {
      return {
        group: key.split('-')[1],
        ranges: groups[key].ranges,
        restAfterGroup: RegExp.$1
      }
    }
  }

  return null
}
