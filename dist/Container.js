'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = require('./helpers');

var Container = function Container(value) {
  var api = {
    value: value,
    map: function map(func) {
      return Container(func(value));
    },
    flatMap: function flatMap(func) {
      return Container((0, _helpers.extract)(func(value)));
    },
    type: 'container'
  };

  return api;
};

Container.of = function (x) {
  return Container(x);
};

exports.default = Container;