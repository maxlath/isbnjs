const parse = require('./parse')
const calculateCheckDigit = require('./calculate_check_digit')

module.exports = source => {
  if (typeof source !== 'string' || source.length === 0) throw Error(`invalid input: ${source}`)

  const result = { source }
  const data = parse(source)
  result.validIsbn = data != null
  const clues = result.clues = []
  const normalizedIsbn = normalize(source)

  if (data) {
    if (normalizedIsbn.length === 13) {
      if (normalizedIsbn.startsWith('978')) considerAltPrefix(normalizedIsbn, '979', clues)
      else if (normalizedIsbn.startsWith('979')) considerAltPrefix(normalizedIsbn, '978', clues)
    }
  } else {
    if (normalizedIsbn.length === 13) {
      if (normalizedIsbn.startsWith('978')) guessPrefixFromChecksum(normalizedIsbn, '979', clues)
      else if (normalizedIsbn.startsWith('979')) guessPrefixFromChecksum(normalizedIsbn, '978', clues)
    }
  }

  return result
}

const considerAltPrefix = (normalizedIsbn, altPrefix, clues) => {
  const candidateBase = `${altPrefix}${normalizedIsbn.substring(3, 12)}`
  const checkDigit = calculateCheckDigit(candidateBase)
  const candidateData = parse(`${candidateBase}${checkDigit}`)
  if (candidateData != null) {
    clues.push({ message: 'possible prefix error', candidate: candidateData.isbn13h })
  }
}

const guessPrefixFromChecksum = (normalizedIsbn, altPrefix, clues) => {
  const usedPrefix = normalizedIsbn.substring(0, 3)
  const altPrefixIsbn = `${altPrefix}${normalizedIsbn.substring(3)}`
  const altPrefixData = parse(altPrefixIsbn)
  if (altPrefixData != null) {
    clues.push({ message: 'checksum hints different prefix', candidate: altPrefixData.isbn13h })
  }
}

const normalize = input => input.replace(/[^\dX]/g, '')
