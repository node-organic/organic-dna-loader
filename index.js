const path = require('path')

const DNA = require('organic').DNA
const loadDir = require('organic-dna-fsloader').loadDir
const resolveFn = require('organic-dna-resolve')
const selectModes = require('organic-dna-cellmodes')
const async = require('async')

module.exports = function loadDna (src, next) {
  let dnaSourcePaths = src
  let dnaMode = process.env.CELL_MODE
  let beforeResolve = null
  let afterResolve = null
  let skipResolve = false
  if (!Array.isArray(src)) {
    dnaSourcePaths = [src]
  }
  if (typeof src === 'function') {
    next = src
    dnaSourcePaths = [path.join(process.cwd(), 'dna')]
  }
  if (typeof src === 'object' && !Array.isArray(src)) {
    if (src.dnaSourcePath) {
      dnaSourcePaths = [src.dnaSourcePath]
    }
    if (src.dnaSourcePaths) {
      dnaSourcePaths = src.dnaSourcePaths
    }
    if (src.dnaMode) {
      dnaMode = src.dnaMode
    }
    if (src.beforeResolve) {
      beforeResolve = src.beforeResolve
    }
    if (src.afterResolve) {
      afterResolve = src.afterResolve
    }
    if (src.skipResolve) {
      skipResolve = src.skipResolve
    }
  }

  const dna = new DNA()
  return new Promise(function (resolve, reject) {
    async.eachSeries(dnaSourcePaths, function (dnaPath, nextDna) {
      loadDir(dna, dnaPath, function (err) {
        if (err) return nextDna(err)
        // fold dna based on cell mode
        if (dnaMode) {
          selectModes(dna, dnaMode)
        }
        nextDna()
      })
    }, async function (err) {
      if (err && next) return next(err)
      if (err) return reject(err)

      try {
        // resolve any referrences
        if (beforeResolve) {
          await beforeResolve(dna)
        }
        if (!skipResolve) {
          resolveFn(dna)
        }
        if (afterResolve) {
          await afterResolve(dna)
        }
      } catch (e) {
        if (next) return next(e)
        reject(e)
      }
      if (next) next(null, dna)
      resolve(dna)
    })
  })
}
