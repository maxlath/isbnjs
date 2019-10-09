const getIsbnCodes = require('./get_isbn_codes')

module.exports = function (value) {
  value = value.toString()

  var data = getIsbnCodes(value)
  if (!data) return null

  var isValid = data.check === (data.isIsbn13 ? data.check13 : data.check10)

  if (isValid) {
    data.isValid = isValid
    return data
  } else {
    return null
  }
}
