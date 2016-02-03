'use strict'
const
  should = require('should'),
  processor = require('../'),
  path = require('path'),
  mockFilePath = path.resolve(__dirname, 'mock-article.md'),
  creationDate = 'Wed, 3 Feb 2016 20:37:09 +0000'

describe('#getCreationDate()', function () {
  it('should return date', function (done) {
    processor
      .getCreationDate(mockFilePath)
      .then((stdout) => {
        let testTime = (new Date(creationDate)).getTime()
        let expTime = (new Date(creationDate)).getTime()
        try {
          testTime.should.be.exactly(expTime)
          done()
        } catch (err) { done(err) }
      }).catch((error) => {
        console.log(`error: ${error}`)
      })
  })
})
