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

module.exports = function (isbn13) {
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
