const should = require('should')
const { parse } = require('../isbn')

describe('parse', () => {
  it('returns an object with all the data when valid', done => {
    parse('9791091146135').isValid.should.be.true()
    parse('979-1091146135').isValid.should.be.true()
    parse('979 1091146135').isValid.should.be.true()
    done()
  })

  it('returns null for invalid ISBNs', done => {
    should(parse('')).not.be.ok()
    should(parse('0-00-000-0')).not.be.ok()
    should(parse('0-00000-0000-0')).not.be.ok()
    should(parse('00000000000000000')).not.be.ok()
    should(parse('9788184890261')).not.be.ok()
    done()
  })

  describe('given an ISBN10', () => {
    const isbnData = parse('0-7356-1967-0')

    it('detects ISBN standard', done => {
      isbnData.isIsbn10.should.be.true()
      isbnData.isIsbn13.should.be.false()
      done()
    })

    it('includes source', done => {
      isbnData.source.should.equal('0-7356-1967-0')
      done()
    })

    it('does not include prefix', done => {
      should(isbnData.prefix).not.be.ok()
      done()
    })

    it('includes group id', done => {
      isbnData.group.should.equal('0')
      done()
    })

    it('includes group name', done => {
      isbnData.groupname.should.equal('English language')
      done()
    })

    it('includes publisher id', done => {
      isbnData.publisher.should.equal('7356')
      done()
    })

    it('includes article id', done => {
      isbnData.article.should.equal('1967')
      done()
    })

    it('includes check digits for ISBN10/13', done => {
      isbnData.check10.should.equal('0')
      isbnData.check13.should.equal('8')
      done()
    })

    it('includes plain and hyphenated versions of ISBN10/13', done => {
      isbnData.isbn10.should.equal('0735619670')
      isbnData.isbn10h.should.equal('0-7356-1967-0')
      isbnData.isbn13.should.equal('9780735619678')
      isbnData.isbn13h.should.equal('978-0-7356-1967-8')
      done()
    })
  })

  describe('given an ISBN10 with checksum X', () => {
    const isbnData = parse('0-304-33376-X')

    it('detects ISBN standard', done => {
      isbnData.isIsbn10.should.be.true()
      isbnData.isIsbn13.should.be.false()
      done()
    })

    it('includes source', done => {
      isbnData.source.should.equal('0-304-33376-X')
      done()
    })

    it('does not include prefix', done => {
      should(isbnData.prefix).not.be.ok()
      done()
    })

    it('includes group id', done => {
      isbnData.group.should.equal('0')
      done()
    })

    it('includes group name', done => {
      isbnData.groupname.should.equal('English language')
      done()
    })

    it('includes publisher id', done => {
      isbnData.publisher.should.equal('304')
      done()
    })

    it('includes article id', done => {
      isbnData.article.should.equal('33376')
      done()
    })

    it('includes check digits for ISBN10/13', done => {
      isbnData.check10.should.equal('X')
      isbnData.check13.should.equal('9')
      done()
    })

    it('includes plain and hyphenated versions of ISBN10/13', done => {
      isbnData.isbn10.should.equal('030433376X')
      isbnData.isbn10h.should.equal('0-304-33376-X')
      isbnData.isbn13.should.equal('9780304333769')
      isbnData.isbn13h.should.equal('978-0-304-33376-9')
      done()
    })
  })

  describe('given an ISBN13', () => {
    const isbnData = parse('978-3-642-38745-6')

    describe('with prefix 978', () => {
      it('detects ISBN standard', done => {
        isbnData.isIsbn10.should.be.false()
        isbnData.isIsbn13.should.be.true()
        done()
      })

      it('includes source', done => {
        isbnData.source.should.equal('978-3-642-38745-6')
        done()
      })

      it('includes prefix', done => {
        isbnData.prefix.should.equal('978')
        done()
      })

      it('includes group id', done => {
        isbnData.group.should.equal('3')
        done()
      })

      it('includes group name', done => {
        isbnData.groupname.should.equal('German language')
        done()
      })

      it('includes publisher id', done => {
        isbnData.publisher.should.equal('642')
        done()
      })

      it('includes article id', done => {
        isbnData.article.should.equal('38745')
        done()
      })

      it('includes check digits for ISBN10/13', done => {
        isbnData.check10.should.equal('4')
        isbnData.check13.should.equal('6')
        done()
      })

      it('includes plain and hyphenated versions of ISBN10/13', done => {
        isbnData.isbn10.should.equal('3642387454')
        isbnData.isbn10h.should.equal('3-642-38745-4')
        isbnData.isbn13.should.equal('9783642387456')
        isbnData.isbn13h.should.equal('978-3-642-38745-6')
        done()
      })
    })

    describe('with prefix 979', () => {
      const isbnData = parse('9791091146135')

      it('includes prefix', done => {
        isbnData.prefix.should.equal('979')
        done()
      })

      it('includes group id', done => {
        isbnData.group.should.equal('10')
        done()
      })

      it('includes group name', done => {
        isbnData.groupname.should.equal('France')
        done()
      })
    })
  })
})
