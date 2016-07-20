var path = require('path')

var DNA = require('organic').DNA
var loadDir = require('organic-dna-fsloader').loadDir
var resolve = require('organic-dna-resolve')
var selectModes = require('organic-dna-cellmodes')

module.exports = function loadDna (src, next) {
  if (typeof src === 'function') {
    next = src
    src = path.join(process.cwd(), 'dna')
  }

  var dna = new DNA()
  loadDir(dna, src, function (err) {
    if (err) return next(err)

    // fold dna based on cell mode
    if (process.env.CELL_MODE) {
      selectModes(dna, process.env.CELL_MODE)
    }

    // resolve any referrences
    resolve(dna)

    next(null, dna)
  })
}
