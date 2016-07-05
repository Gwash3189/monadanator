'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = require('./helpers');

var Container = function Container(value) {
  var api = {
    value: value,
    of: function of(arg) {
      return Container(arg);
    },
    map: function map(func) {
      return Container(func(value));
    },
    flatMap: function flatMap(func) {
      return Container(func(value).value);
    },
    ap: (0, _helpers.match)([_helpers.isAMonad, function (m) {
      return m.map(value);
    }], [_helpers.yes, function (v) {
      return Container(v).map(value);
    }])
  };

  return api;
};

Container.of = function (x) {
  return Container(x);
};

exports.default = Container;