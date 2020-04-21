const groups = require('./groups')

const groupsMap = {}
Object.keys(groups).forEach(groupPrefix => {
  const [ prefix, group ] = groupPrefix.split('-')
  const groupFirstDigit = group[0]
  groupsMap[prefix] = groupsMap[prefix] || {}
  groupsMap[prefix][groupFirstDigit] = groupsMap[prefix][groupFirstDigit] || {}
  groupsMap[prefix][groupFirstDigit][group] = groups[groupPrefix]
})

module.exports = isbn13 => {
  const prefix = isbn13.substring(0, 3)
  const restAfterPrefix = isbn13.substring(3)
  const groupFirstDigit = restAfterPrefix[0]
  const possibleGroups = groupsMap[prefix][groupFirstDigit]

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
