const parse = require('./lib/parse')
const audit = require('./lib/audit')

module.exports = {
  parse,
  audit,

  hyphenate: val => {
    const data = parse(val)
    if (!data) return null
    return data.isIsbn13 ? data.isbn13h : data.isbn10h
  },
  asIsbn13: (val, hyphen) => {
    const data = parse(val)
    if (!data) return null
    return hyphen ? data.isbn13h : data.isbn13
  },
  asIsbn10: (val, hyphen) => {
    const data = parse(val)
    if (!data) return null
    // Return null for cases where it shouldn't map to an ISBN 10
    // ex: 979-10-91146-13-5
    if (!data.isbn10) return null
    return hyphen ? data.isbn10h : data.isbn10
  },

  groups: require('./lib/groups')
}
