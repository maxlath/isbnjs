const should = require('should')
const { audit } = require('../isbn')

describe('audit', () => {
  it('should find potential 979-prefixed ISBN-13 converted to ISBN10 and wrongly reconverted to 978-prefixed ISBN13', () => {
    const clues = [
      { label: 'possible prefix error', candidate: '979-10-90648-52-4' }
    ]
    audit('978-1-0906-4852-5').clues.should.deepEqual(clues)
    audit('9781090648525').clues.should.deepEqual(clues)
    audit('978-1090648525').clues.should.deepEqual(clues)
  })

  it('should find 979-prefixed ISBN-13 passed as invalid 978-prefixed ISBN-13', () => {
    const clues = [
      { label: 'wrong prefix', candidate: '979-10-90648-52-4' }
    ]
    audit('978-1-0906-4852-4').clues.should.deepEqual(clues)
    audit('9781090648524').clues.should.deepEqual(clues)
    audit('978-1090648524').clues.should.deepEqual(clues)
  })
})
