/* global describe, it */
var expect = require('chai').expect

describe('dna-loader', function () {
  it('works', function (next) {
    var loader = require('../index')
    loader(__dirname + '/sample-dna', function (err, dna) {
      expect(err).to.be.falsy
      expect(dna).to.be.object
      expect(dna.index.property).to.eq(42)
      next()
    })
  })

  it('works with mode', function (next) {
    process.env.CELL_MODE = '_mode1'
    var loader = require('../index')
    loader(__dirname + '/sample-dna', function (err, dna) {
      expect(err).to.be.falsy
      expect(dna).to.be.object
      expect(dna.index.property).to.eq('updated-42')
      next()
    })
  })

  it('works with modes', function (next) {
    process.env.CELL_MODE = '_mode1+mode2'
    var loader = require('../index')
    loader(__dirname + '/sample-dna', function (err, dna) {
      expect(err).to.be.falsy
      expect(dna).to.be.object
      expect(dna.index.property).to.eq('updated-property-42')
      next()
    })
  })

  it('works with modes reversed', function (next) {
    process.env.CELL_MODE = 'mode2+_mode1'
    var loader = require('../index')
    loader(__dirname + '/sample-dna', function (err, dna) {
      expect(err).to.be.falsy
      expect(dna).to.be.object
      expect(dna.index.property).to.eq('updated-42')
      next()
    })
  })
})
