'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Container = require('./Container');

var Right = function Right(value) {
  var api = (0, _Container.Container)(value);
  api.type = 'right';
};

exports.default = Right;