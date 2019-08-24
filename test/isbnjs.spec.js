const should = require('should')
const ISBN = require('../isbn')

describe('isbn module', () => {
  describe('ISBN', () => {
    describe('parse', () => {
      it('returns an object with all the data when valid', done => {
        ISBN.parse('9791091146135').isValid.should.be.true()
        done()
      })

      it('returns null for invalid ISBNs', done => {
        should(ISBN.parse('')).not.be.ok()
        should(ISBN.parse('0-00-000-0')).not.be.ok()
        should(ISBN.parse('0-00000-0000-0')).not.be.ok()
        should(ISBN.parse('00000000000000000')).not.be.ok()
        should(ISBN.parse('9788184890261')).not.be.ok()
        done()
      })

      describe('given an ISBN10', () => {
        const isbnData = ISBN.parse('0-7356-1967-0')

        it('detects ISBN standard', done => {
          isbnData.isIsbn10.should.be.true()
          isbnData.isIsbn13.should.be.false()
          done()
        })

        describe('.codes object', () => {
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
      })

      describe('given an ISBN13', () => {
        const isbnData = ISBN.parse('978-3-642-38745-6')

        describe('with prefix 978', () => {
          it('detects ISBN standard', done => {
            isbnData.isIsbn10.should.be.false()
            isbnData.isIsbn13.should.be.true()
            done()
          })

          describe('.codes object', () => {
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
        })

        describe('with prefix 979', () => {
          it('does not try to "map" it to ISBN10', done => {
            should(ISBN.asIsbn10('9791091146135')).not.be.ok()
            done()
          })

          describe('.codes object', () => {
            const isbnData = ISBN.parse('9791091146135')
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
    })

    describe('.asIsbn13()', () => {
      it('converts ISBN10 to ISBN13', done => {
        ISBN.asIsbn13('4-87311-336-9').should.equal('9784873113364')
        done()
      })

      it('accepts ISBN13 as well', done => {
        ISBN.asIsbn13('978-4-87311-336-4').should.equal('9784873113364')
        done()
      })

      it('hyphenates result', done => {
        ISBN.asIsbn13('4-87311-336-9', true).should.equal('978-4-87311-336-4')
        done()
      })

      it('returns null if ISBN is invalid', done => {
        should(ISBN.asIsbn10('4873113361')).not.be.ok()
        done()
      })
    })

    describe('.asIsbn10()', () => {
      it('converts ISBN13 to ISBN10', done => {
        ISBN.asIsbn10('978-4-87311-336-4').should.equal('4873113369')
        done()
      })

      it('accepts ISBN10 as well', done => {
        ISBN.asIsbn10('4-87311-336-9').should.equal('4873113369')
        done()
      })

      it('hyphenates result', done => {
        ISBN.asIsbn10('978-4-87311-336-4', true).should.equal('4-87311-336-9')
        done()
      })

      it('returns null if ISBN is invalid', done => {
        should(ISBN.asIsbn10('9790000000000')).not.be.ok()
        done()
      })
    })

    describe('.hyphenate()', () => {
      it('hyphenates ISBN10s', done => {
        ISBN.hyphenate('4873113369').should.equal('4-87311-336-9')
        done()
      })

      it('hyphenates ISBN13s', done => {
        ISBN.hyphenate('9784873113364').should.equal('978-4-87311-336-4')
        ISBN.hyphenate('9791091146135').should.equal('979-10-91146-13-5')
        done()
      })

      it('does not refuse hyphenated ISBNs', done => {
        ISBN.hyphenate('4-87311-336-9').should.equal('4-87311-336-9')
        ISBN.hyphenate('978-4-87311-336-4').should.equal('978-4-87311-336-4')
        done()
      })

      it('returns null for non-valid ISBN', done => {
        should(ISBN.hyphenate('4873113360')).not.be.ok()
        should(ISBN.hyphenate('9784873113360')).not.be.ok()
        done()
      })
    })
  })
})
