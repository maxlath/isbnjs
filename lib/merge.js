module.exports = function (lobj, robj) {
  var key
  if (!lobj || !robj) {
    return null
  }

  for (key in robj) {
    if (robj.hasOwnProperty(key)) {
      lobj[key] = robj[key]
    }
  }

  return lobj
}
