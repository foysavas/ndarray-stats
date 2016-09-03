'use strict';

module.exports = ndarrayStats;

var cwise = require('cwise');

var calcStats1d = cwise({
  args: ['index', 'array'],
  pre: function () {
    this.colStats = {
      'count': 0,
      'min': Number.POSITIVE_INFINITY,
      'max': Number.NEGATIVE_INFINITY,
      'sum': 0,
      'sum_of_squares': 0
    };
  },
  body: function (index, a) {
    var colStats = this.colStats;
    if (!Number.isNaN(a)) {
      colStats.count += 1;
      colStats.sum += a;
      colStats.sum_of_squares += a * a;
      if (a < colStats.min) { colStats.min = a; }
      if (a > colStats.max) { colStats.max = a; }
    }
    this.colStats = colStats;
  },
  post: function () {
    var colStats = this.colStats;
    var mean = colStats.sum / colStats.count;
    var variance = (colStats.sum_of_squares - (colStats.sum * colStats.sum) / colStats.count) / (colStats.count - 1);
    var std = Math.sqrt(variance);
    return ({
      'count': colStats.count,
      'min': colStats.min,
      'max': colStats.max,
      'sum': colStats.sum,
      'sum_of_squares': colStats.sum_of_squares,
      'mean': mean,
      'std': std,
      'variance': variance
    });
  }
});

var calcStats2d = cwise({
  args: ['shape', 'index', 'array'],
  pre: function (shape) {
    this.colStats = [];
    var cols = shape[1];
    for (let coli = 0; coli < cols; coli++) {
      this.colStats[coli] = {
        'count': 0,
        'min': Number.POSITIVE_INFINITY,
        'max': Number.NEGATIVE_INFINITY,
        'sum': 0,
        'sum_of_squares': 0
      };
    }
  },
  body: function (shape, index, a) {
    var coli = index[1];
    var colStats = this.colStats[coli];
    if (!Number.isNaN(a)) {
      colStats.count += 1;
      colStats.sum += a;
      colStats.sum_of_squares += a * a;
      if (a < colStats.min) { colStats.min = a; }
      if (a > colStats.max) { colStats.max = a; }
    }
    this.colStats[coli] = colStats;
  },
  post: function (shape) {
    var r = [];
    var cols = shape[1];
    for (let coli = 0; coli < cols; coli++) {
      var colStats = this.colStats[coli];
      var mean = colStats.sum / colStats.count;
      var variance = (colStats.sum_of_squares - (colStats.sum * colStats.sum) / colStats.count) / (colStats.count - 1);
      var std = Math.sqrt(variance);
      r.push({
        'count': colStats.count,
        'min': colStats.min,
        'max': colStats.max,
        'sum': colStats.sum,
        'sum_of_squares': colStats.sum_of_squares,
        'mean': mean,
        'std': std,
        'variance': variance
      });
    }
    return r;
  }
});

function ndarrayStats (nd) {
  var dim = nd.shape.length;
  if (dim === 1) {
    return calcStats1d(nd);
  } else if (dim === 2) {
    return calcStats2d(nd);
  } else {
    throw new Error('ndarray-stats only accepts ndarrays of dim 1 or 2');
  }
}
