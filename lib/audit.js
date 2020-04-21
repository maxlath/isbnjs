const parse = require('./parse')
const calculateCheckDigit = require('./calculate_check_digit')

module.exports = source => {
  if (typeof source !== 'string' || source.length === 0) throw Error(`invalid input: ${source}`)

  const result = { source }
  const data = parse(source)
  result.plausibleIsbn = data != null
  const clues = result.clues = []

  if (data) {
    const { prefix, isbn10 } = data
    const candidateBase = `979${isbn10.substring(0, 9)}`
    const checkDigit = calculateCheckDigit(candidateBase)
    const candidateData = parse(`${candidateBase}${checkDigit}`)
    if (candidateData != null) {
      clues.push({ label: 'possible prefix error', candidate: candidateData.isbn13h })
    }
  } else {
    const normalizedIsbn = source.replace(/[^\dX]/g, '')
    if (normalizedIsbn.startsWith('978')) {
      const altPrefixIsbn = `979${normalizedIsbn.substring(3)}`
      const altPrefixData = parse(altPrefixIsbn)
      if (altPrefixData != null) {
        clues.push({ label: 'wrong prefix', candidate: altPrefixData.isbn13h })
      }
    }
  }

  return result
}
