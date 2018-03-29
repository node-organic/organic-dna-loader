var path = require('path')

var DNA = require('organic').DNA
var loadDir = require('organic-dna-fsloader').loadDir
var resolve = require('organic-dna-resolve')
var selectModes = require('organic-dna-cellmodes')

module.exports = function loadDna (src, next) {
  var dnaSourcePath = src
  var dnaMode = process.env.CELL_MODE
  if (typeof src === 'function') {
    next = src
    dnaSourcePath = path.join(process.cwd(), 'dna')
  }

  if (typeof src === 'object') {
    if (src.dnaSourcePath) {
      dnaSourcePath = src.dnaSourcePath
    }
    if (src.dnaMode) {
      dnaMode = src.dnaMode
    }
  }

  var dna = new DNA()
  loadDir(dna, dnaSourcePath, function (err) {
    if (err) return next(err)

    // fold dna based on cell mode
    if (dnaMode) {
      selectModes(dna, dnaMode)
    }

    // resolve any referrences
    resolve(dna)

    next(null, dna)
  })
}
