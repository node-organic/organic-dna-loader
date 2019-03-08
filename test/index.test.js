/* global describe, it */
var expect = require('chai').expect
var path = require('path')

describe('dna-loader', function () {
  it('works', function (next) {
    var loader = require('../index')
    loader(path.join(__dirname, '/sample-dna'), function (err, dna) {
      expect(err).to.eq(null)
      expect(dna.index.property).to.eq(42)
      next()
    })
  })

  it('works with mode', function (next) {
    process.env.CELL_MODE = '_mode1'
    var loader = require('../index')
    loader(path.join(__dirname, '/sample-dna'), function (err, dna) {
      expect(err).to.eq(null)
      expect(dna.index.property).to.eq('updated-42')
      next()
    })
  })

  it('works with modes', function (next) {
    process.env.CELL_MODE = '_mode1+mode2'
    var loader = require('../index')
    loader(path.join(__dirname, '/sample-dna'), function (err, dna) {
      expect(err).to.eq(null)
      expect(dna.index.property).to.eq('updated-property-42')
      next()
    })
  })

  it('works with modes reversed', function (next) {
    process.env.CELL_MODE = 'mode2+_mode1'
    var loader = require('../index')
    loader(path.join(__dirname, '/sample-dna'), function (err, dna) {
      expect(err).to.eq(null)
      expect(dna.index.property).to.eq('updated-42')
      next()
    })
  })

  it('works with options argument', function (next) {
    var loader = require('../index')
    loader({
      dnaSourcePath: path.join(__dirname, '/sample-dna'),
      dnaMode: '_mode1'
    }, function (err, dna) {
      expect(err).to.eq(null)
      expect(dna.index.property).to.eq('updated-42')
      next()
    })
  })

  it('works with multiple sources', function (next) {
    var loader = require('../index')
    loader({
      dnaSourcePaths: [
        path.join(__dirname, '/sample-dna'),
        path.join(__dirname, '/sample-dna2')
      ],
      dnaMode: '_mode1'
    }, function (err, dna) {
      expect(err).to.eq(null)
      expect(dna.index.property).to.eq('updated-42')
      expect(dna.index2).to.eq('value-42')
      expect(dna.index.property2).to.eq('value')
      next()
    })
  })
})
