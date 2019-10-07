const should = require('should')
const { groups } = require('../isbn')

describe('groups', () => {
  it('should be the groups data object', done => {
    groups['978-99972'].name.should.equal('Faroe Islands')
    groups['978-99972'].ranges.should.be.an.Array()
    done()
  })
})
