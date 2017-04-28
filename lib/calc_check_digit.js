module.exports = function (isbn) {
  var c
  var n

  if (isbn.match(/^\d{9}[\dX]?$/)) {
    c = 0
    for (n = 0; n < 9; n += 1) {
      c += (10 - n) * isbn.charAt(n)
    }

    c = (11 - c % 11) % 11
    return c === 10 ? 'X' : String(c)
  } else if (isbn.match(/(?:978|979)\d{9}[\dX]?/)) {
    c = 0
    for (n = 0; n < 12; n += 2) {
      c += Number(isbn.charAt(n)) + 3 * isbn.charAt(n + 1)
    }

    return String((10 - c % 10) % 10)
  }

  return null
}
