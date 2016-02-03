'use strict'

const
  exec = require('child_process').exec,
  fs = require('fs')

module.exports = {
  getCreationDate: getCreationDate
}

function getCreationDate(filename) {
  return new Promise((resolve, reject) => {
    // source: http://stackoverflow.com/questions/2390199/finding-the-date-time-a-file-was-first-added-to-a-git-repository
    let bashCmd = `git log --diff-filter=A --follow --format=%aD -1 -- ${filename}`
    let exists = false

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
