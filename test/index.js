'use strict';

var assert = require('chai').assert;
var ndarray = require('ndarray');

var stats = require('../');

describe('ndarray-stats', function () {
  it('1d', function () {
    var A = ndarray([1, 2, 3, 4, 5, 6], [6]);
    var r = stats(A);

    assert.equal(r.count, 6);
    assert.equal(r.min, 1);
    assert.equal(r.max, 6);
    assert.equal(r.sum, 21);
    assert.equal(r.sum_of_squares, 91);
    assert.equal(r.mean, 3.5);
    assert.equal(r.std, 1.8708286933869707);
    assert.equal(r.variance, 3.5);
  });

  it('2d', function () {
    var A = ndarray([1, 2, 3, NaN, 5, 6], [3, 2]);
    var r = stats(A);

    assert.equal(r.length, 2);

    assert.equal(r[0].count, 3);
    assert.equal(r[0].min, 1);
    assert.equal(r[0].max, 5);
    assert.equal(r[0].sum, 9);
    assert.equal(r[0].sum_of_squares, 35);
    assert.equal(r[0].mean, 3);
    assert.equal(r[0].std, 2);
    assert.equal(r[0].variance, 4);

    assert.equal(r[1].count, 2);
    assert.equal(r[1].min, 2);
    assert.equal(r[1].max, 6);
    assert.equal(r[1].sum, 8);
    assert.equal(r[1].sum_of_squares, 40);
    assert.equal(r[1].mean, 4);
    assert.equal(r[1].std, 2.8284271247461903);
    assert.equal(r[1].variance, 8);
  });

  it('3d', function () {
    var A = ndarray([1, 2, 3, 4, 5, 6, 7, 8], [2, 2, 2]);
    assert.throws(function () { stats(A); });
  });
});
