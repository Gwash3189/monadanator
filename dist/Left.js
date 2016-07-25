'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Left = function Left(value) {
  var api = {
    value: value,
    map: function map(func) {
      return Left(value);
    },
    flatMap: function flatMap(func) {
      return Left(value);
    },
    type: 'left'
  };

  return api;
};

Left.of = function (x) {
  return Left(x);
};

exports.default = Left;