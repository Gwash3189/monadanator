'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = require('./helpers');

var acceptableValue = function acceptableValue(x) {
  return !(0, _helpers.nil)(x) && !(0, _helpers.isAnError)(x);
};
var handle = function handle(f, onError) {
  return function (x) {
    try {
      return f(x);
    } catch (e) {
      return onError(e);
    }
  };
};
var Maybe = function Maybe(value) {
  var api = {
    value: value,
    of: function of(arg) {
      return Maybe(arg);
    },
    map: handle(function (func) {
      return acceptableValue(value) ? Maybe(func(value)) : Maybe(value);
    }, Maybe),
    flatMap: handle(function (func) {
      return acceptableValue(value) ? Maybe((0, _helpers.extract)(func(value))) : Maybe(value);
    }, Maybe),
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