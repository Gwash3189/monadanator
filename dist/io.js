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
        return func(api.value).value;
      });
    },
    ap: function ap(container) {
      return IO(function () {
        return value(container.value);
      });
    }
  };

  return api;
};

exports.default = IO;