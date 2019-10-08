const groups = require('./groups')

const groupsMap = Object.keys(groups)
  .reduce((obj, groupPrefix) => {
    const [ prefix, group ] = groupPrefix.split('-')
    const groupFirstNumber = group[0]
    obj[prefix] = obj[prefix] || {}
    obj[prefix][groupFirstNumber] = obj[prefix][groupFirstNumber] || {}
    obj[prefix][groupFirstNumber][group] = groups[groupPrefix]
    return obj
  }, {})

module.exports = function (isbn) {
  if (isbn) {
    if (isbn.length === 10) isbn = '978' + isbn
    if (isbn.length === 13) return splitToObject(isbn)
  }

  return null
}

const splitToObject = function (isbn13) {
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

const getGroupRecord = function (isbn13) {
  const prefix = isbn13.substring(0, 3)
  const restAfterPrefix = isbn13.substring(3)
  const groupFirstNumber = restAfterPrefix[0]
  const possibleGroups = groupsMap[prefix][groupFirstNumber]

  for (let groupPrefix in possibleGroups) {
    if (restAfterPrefix.startsWith(groupPrefix)) {
      return {
        group: groupPrefix,
        ranges: possibleGroups[groupPrefix].ranges,
        restAfterGroup: restAfterPrefix.slice(groupPrefix.length)
      }
    }
  }

  return null
}
