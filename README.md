# ndarray-stats

Calculates summary statistics for an [ndarray](https://github.com/scijs/ndarray).

Only works with 1 or 2 dimensional arrays and aggregates by column.

# Examples

## 1 Dimension

```javascript
var ndarray = require('ndarray');
var ndarrayStats = require('ndarray-stats');

var A = ndarray([1, 2, 3, 4, 5, 6], [6]);
var r = ndarrayStats(A);

// r is now an object with summary stats
//
// r = {
//   count: 6
//   max: 6
//   mean: 3.5
//   min: 1
//   std: 1.8708286933869707
//   sum: 21
//   sum_of_squares: 91
//   variance: 3.5
// }
```

## 2 Dimensions

```javascript
var ndarray = require('ndarray');
var ndarrayStats = require('ndarray-stats');

var A = ndarray([1, 2, 3, 4, 5, 6, 7, 8, 9], [3, 3]);
var r = ndarrayStats(A);

// r is now an array of objects with summary stats, one for each column
//
// r[0] = {
//   count: 3
//   max: 7
//   mean: 4
//   min: 1
//   std: 3
//   sum: 12
//   sum_of_squares: 66
//   variance: 9
// }

```

# Install

    npm install ndarray-stats

# Credits
(c) 2016 Foy Savas. MIT License
