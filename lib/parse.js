const getRet = require('./get_ret')
const merge = require('./merge')

module.exports = function (val) {
  val = val.toString()

  var ret = getRet(val)
  if (!ret) return null

  var isValid = ret.check === (ret.isIsbn13 ? ret.check13 : ret.check10)

  if (isValid) {
    ret.isValid = isValid
    return ret
  } else {
    return null
  }
}
