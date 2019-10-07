const should = require('should')
const { asIsbn13 } = require('../isbn')

describe('asIsbn13', () => {
  it('converts ISBN10 to ISBN13', done => {
    asIsbn13('4-87311-336-9').should.equal('9784873113364')
    done()
  })

  it('accepts ISBN13 as well', done => {
    asIsbn13('978-4-87311-336-4').should.equal('9784873113364')
    done()
  })

  it('hyphenates result', done => {
    asIsbn13('4-87311-336-9', true).should.equal('978-4-87311-336-4')
    done()
  })

  it('returns null if ISBN is invalid', done => {
    should(asIsbn13('4873113361')).not.be.ok()
    done()
  })
})
