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
    ap: (0, _helpers.match)([_helpers.nil, function (x) {
      return Maybe.of(x);
    }], [_helpers.isAMonad, function (m) {
      return m.map(value);
    }], [_helpers.yes, function (v) {
      return Maybe(v).map(value);
    }]),
    error: function error(f) {
      return (0, _helpers.nil)(value) ? f() : false;
    }
  };

  return api;
};

Maybe.of = function (x) {
  return Maybe(x);
};

exports.default = Maybe;