'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = require('./helpers');

var isNotNil = function isNotNil(x) {
  return function (f) {
    return (0, _helpers.nil)(x) ? Maybe(x) : f(x);
  };
};

var Maybe = function Maybe(value) {
  var notNil = isNotNil(value);

  var api = {
    value: value,
    of: function of(arg) {
      return Maybe(arg);
    },
    map: function map(func) {
      return notNil(function (value) {
        return Maybe(func(value));
      });
    },
    flatMap: function flatMap(func) {
      return notNil(function (value) {
        return Maybe(func(value).value);
      });
    },
    ap: function ap(container) {
      return notNil(function (value) {
        return Maybe(value(container.value));
      });
    }
  };

  return api;
};

exports.default = Maybe;