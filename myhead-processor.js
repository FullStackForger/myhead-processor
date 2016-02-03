'use strict'

const exec = require('child_process').exec

module.exports = {
  getCreationDate: getCreationDate
}

function getCreationDate(filename) {
  return new Promise((resolve, reject) => {
    // source: http://stackoverflow.com/questions/2390199/finding-the-date-time-a-file-was-first-added-to-a-git-repository
    let bashCmd = `git log --diff-filter=A --follow --format=%aD -1 -- ${filename}`
    let child = exec(bashCmd, (error, stdout, stderr) => {
        if (stderr !== null && stderr.length > 0) return reject(new Error(stderr))
        if (error !== null) return reject(error)
        resolve(stdout)
    })
  })
}
