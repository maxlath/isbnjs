const should = require('should')
const { asIsbn13 } = require('../isbn')

describe('asIsbn13', () => {
  it('converts ISBN10 to ISBN13', done => {
    asIsbn13('4-87311-336-9').should.equal('9784873113364')
    done()
  })

  it('accepts ISBN10 with checksum X', done => {
    asIsbn13('0-304-33376-X').should.equal('9780304333769')
    done()
  })

  it('accepts ISBN13', done => {
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
