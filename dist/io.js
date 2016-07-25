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
    type: 'io'
  };

  return api;
};

IO.of = function (x) {
  return IO(x);
};

exports.default = IO;