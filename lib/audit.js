const parse = require('./parse')
const calculateCheckDigit = require('./calculate_check_digit')

module.exports = source => {
  const clues = []
  const data = parse(source)

  if (!data) return { clues, source, validSource: false }

  const { prefix, isbn10 } = data

  if (prefix === '978') {
    const candidateBase = `979${isbn10.substring(0, 9)}`
    const checkDigit = calculateCheckDigit(candidateBase)
    const candidateData = parse(`${candidateBase}${checkDigit}`)
    if (candidateData != null) {
      clues.push({ label: 'possible prefix error', candidate: candidateData.isbn13h })
    }
  }

  return { clues, source }
}
