'use strict'
const
  should = require('should'),
  processor = require('../'),
  path = require('path'),
  mockFilePath = path.resolve(__dirname, 'mock-article.md')

describe('#getCreationDate()', function () {
  it('should return date', function (done) {
    let creationDate = 'Wed, 3 Feb 2016 20:37:09 +0000'
    processor
      .getCreationDate(mockFilePath)
      .then((stdout) => {
        let testTime = (new Date(creationDate)).getTime()
        let expTime = (new Date(stdout)).getTime()
        try {
          testTime.should.be.exactly(expTime)
          done()
        } catch (err) { done(err) }
      }).catch((error) => done(error))
  })

  it('should report error', function (done) {
    processor
      .getCreationDate('broken-file-name')
      .then((stdout) => {
          done(new Error('Unexpected Error'))
      }).catch((error) => { try {
        error.message.should.startWith('ENOENT: no such file or directory')
        done()
      } catch (err) { done(err) }})
  })
})

describe('#getLastUpdateDate()', function () {
  it('should return date', function (done) {
    let creationDate = 'Wed Feb 3 20:40:33 2016 +0000'
    processor
      .getLastUpdateDate(mockFilePath)
      .then((stdout) => {
        let testTime = (new Date(creationDate)).getTime()
        let expTime = (new Date(stdout)).getTime()
        try {
          testTime.should.be.exactly(expTime)
          done()
        } catch (err) { done(err) }
      }).catch((error) => done(error))
  })

  it('should report error', function (done) {
    processor
      .getLastUpdateDate('broken-file-name')
      .then((stdout) => {
          done(new Error('Unexpected Error'))
      }).catch((error) => { try {
        error.message.should.startWith('ENOENT: no such file or directory')
        done()
      } catch (err) { done(err) }})
  })
})
