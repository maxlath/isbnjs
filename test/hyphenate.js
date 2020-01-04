const should = require('should')
const { hyphenate } = require('../isbn')

describe('hyphenate', () => {
  it('hyphenates ISBN10s', done => {
    hyphenate('4873113369').should.equal('4-87311-336-9')
    done()
  })

  it('hyphenates ISBN10s with checksum X', done => {
    hyphenate('030433376X').should.equal('0-304-33376-X')
    done()
  })

  it('hyphenates ISBN13s', done => {
    hyphenate('9784873113364').should.equal('978-4-87311-336-4')
    hyphenate('9791091146135').should.equal('979-10-91146-13-5')
    done()
  })

  it('hyphenates ISBN13s with spaces', done => {
    hyphenate('978 4873113364').should.equal('978-4-87311-336-4')
    hyphenate('979 1091146135').should.equal('979-10-91146-13-5')
    done()
  })

  it('does not refuse hyphenated ISBNs', done => {
    hyphenate('4-87311-336-9').should.equal('4-87311-336-9')
    hyphenate('978-4-87311-336-4').should.equal('978-4-87311-336-4')
    done()
  })

  it('returns null for non-valid ISBN', done => {
    should(hyphenate('4873113360')).not.be.ok()
    should(hyphenate('9784873113360')).not.be.ok()
    done()
  })
})
