const should = require('should')
const { audit } = require('../isbn')

describe('audit', () => {
  it('should find potential 979-prefixed ISBN-13 converted to ISBN10 and wrongly reconverted to 978-prefixed ISBN13', () => {
    const clues = [
      { label: 'possible prefix error', candidate: '979-10-90648-52-4' }
    ]
    audit('978-1-0906-4852-5').should.deepEqual({ source: '978-1-0906-4852-5', clues })
    audit('9781090648525').should.deepEqual({ source: '9781090648525', clues })
    audit('978-1090648525').should.deepEqual({ source: '978-1090648525', clues })
  })
})
