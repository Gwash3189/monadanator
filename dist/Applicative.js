'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = require('./helpers');

var Applicative = function Applicative(value) {
  var api = {
    value: value,
    map: function map(func) {
      return Applicative(func(value));
    },
    flatMap: function flatMap(func) {
      return Applicative((0, _helpers.extract)(func(value)));
    },
    ap: function ap(monad) {
      return Applicative(value((0, _helpers.extract)(monad)));
    },
    type: 'applicative'
  };

  return api;
};

Applicative.of = function (x) {
  return Applicative(x);
};

exports.default = Applicative;