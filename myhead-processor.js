'use strict'

const
  exec = require('child_process').exec,
  fs = require('fs'),
  internal = {},
  processor = {}

module.exports = processor

processor.getCreationDate = function(filename) {
  // source: http://stackoverflow.com/questions/2390199/finding-the-date-time-a-file-was-first-added-to-a-git-repository
  let bashCmd = `git log --diff-filter=A --follow --format=%aD -1 -- ${filename}`
  return internal.runBashCommand(bashCmd, filename)
}

processor.getLastUpdateDate = function(filename) {
  // grep list of authors from the file log
  let bashCmd = `git log -1 --format=%cd -- ${filename}`
  return internal.runBashCommand(bashCmd, filename)
}

internal.runBashCommand = function(bashCmd, filename) {
  let exists = false
  return new Promise((resolve, reject) => {
    fs.stat(filename, (err, stat) => {
      if ((err !== null)) return reject(err)
      exec(bashCmd, (error, stdout, stderr) => {
        if (stderr !== null && stderr.length > 0) return reject(new Error(stderr))
        if (error !== null) return reject(error)
        resolve(stdout)
      })
    })
  })
}
