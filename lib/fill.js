const groups = require('./groups')
const calcCheckDigit = require('./calc_check_digit')

module.exports = function (codes) {
  if (!codes) return null

  const prefix = codes.prefix ? codes.prefix : '978'

  const groupRecord = groups[prefix + '-' + codes.group]
  if (!groupRecord) return null

  const isbn10WithoutCheck = `${codes.group}${codes.publisher}${codes.article}`

  const check10 = calcCheckDigit(isbn10WithoutCheck)
  if (!check10) return null

  const check13 = calcCheckDigit(prefix + isbn10WithoutCheck)
  if (!check13) return null

  const parts13 = [ prefix, codes.group, codes.publisher, codes.article, check13 ]
  Object.assign(codes, {
    isbn13: parts13.join(''),
    isbn13h: parts13.join('-'),
    check10,
    check13,
    groupname: groupRecord.name
  })

  if (prefix === '978') {
    const parts10 = [ codes.group, codes.publisher, codes.article, check10 ]
    Object.assign(codes, {
      isbn10: parts10.join(''),
      isbn10h: parts10.join('-')
    })
  }

  return codes
}
