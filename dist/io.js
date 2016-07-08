'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = require('./helpers');

var IO = function IO(val) {
  var value = (0, _helpers.match)([_helpers.isAFunction, _helpers.identity], [_helpers.yes, _helpers.thunk])(val);

  var api = {
    get value() {
      return value();
    },
    perform: function perform() {
      return api.value;
    },
    of: function of(x) {
      return IO(x);
    },
    map: function map(func) {
      return IO(function () {
        return func(api.value);
      });
    },
    flatMap: function flatMap(func) {
      return IO(function () {
        return (0, _helpers.extract)(func(api.value));
      });
    },
    ap: (0, _helpers.match)([_helpers.isAMonad, function (m) {
      return m.map(value);
    }], [_helpers.yes, function (v) {
      return IO(v).map(value);
    }])
  };

  return api;
};

IO.of = function (x) {
  return IO(x);
};

exports.default = IO;