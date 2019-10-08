const getIsbnData = require('./get_isbn_data')

module.exports = function (val) {
  val = val.toString()

  var data = getIsbnData(val)
  if (!data) return null

  var isValid = data.check === (data.isIsbn13 ? data.check13 : data.check10)

  if (isValid) {
    data.isValid = isValid
    return data
  } else {
    return null
  }
}
