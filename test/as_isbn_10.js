const should = require('should')
const { asIsbn10 } = require('../isbn')

describe('asIsbn10', () => {
  it('converts ISBN13 to ISBN10', done => {
    asIsbn10('978-4-87311-336-4').should.equal('4873113369')
    done()
  })

  it('accepts ISBN10 as well', done => {
    asIsbn10('4-87311-336-9').should.equal('4873113369')
    done()
  })

  it('hyphenates result', done => {
    asIsbn10('978-4-87311-336-4', true).should.equal('4-87311-336-9')
    done()
  })

  it('returns null if ISBN is invalid', done => {
    should(asIsbn10('9790000000000')).not.be.ok()
    done()
  })

  describe('with prefix 979', () => {
    it('does not try to "map" it to ISBN10', done => {
      should(asIsbn10('9791091146135')).not.be.ok()
      done()
    })
  })
})
