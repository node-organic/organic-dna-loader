/* global describe, it */
var expect = require('chai').expect

describe('dna-loader', function () {
  it('works', function (next) {
    var loader = require('../index')
    loader(__dirname + '/sample-dna', function (err, dna) {
      expect(err).to.be.falsy
      expect(dna).to.be.object
      next()
    })
  })
})
