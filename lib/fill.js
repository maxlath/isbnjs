const groups = require('../groups')
const merge = require('./merge')
const calcCheckDigit = require('./calc_check_digit')

module.exports = function (codes) {
  var rec
  var prefix
  var ck10
  var ck13
  var parts13
  var parts10

  if (!codes) return null

  prefix = codes.prefix ? codes.prefix : '978'

  rec = groups[prefix + '-' + codes.group]
  if (!rec) return null

  ck10 = calcCheckDigit([ codes.group, codes.publisher, codes.article ].join(''))
  if (!ck10) return null

  ck13 = calcCheckDigit([ prefix, codes.group, codes.publisher, codes.article ].join(''))
  if (!ck13) {
    return null
  };

  parts13 = [ prefix, codes.group, codes.publisher, codes.article, ck13 ]
  merge(codes, {
    isbn13: parts13.join(''),
    isbn13h: parts13.join('-'),
    check10: ck10,
    check13: ck13,
    groupname: rec.name
  })

  if (prefix === '978') {
    parts10 = [ codes.group, codes.publisher, codes.article, ck10 ]
    merge(codes, { isbn10: parts10.join(''), isbn10h: parts10.join('-') })
  }

  return codes
}
