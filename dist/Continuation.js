'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _es6Promise = require('es6-promise');

var _helpers = require('./helpers');

var _IO = require('./IO');

var _IO2 = _interopRequireDefault(_IO);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _es6Promise.polyfill)();

var Continuation = function Continuation(funcOrIo) {
  var value = (0, _helpers.isAMonad)(funcOrIo) ? funcOrIo : (0, _helpers.isAString)(funcOrIo) ? (0, _IO2.default)(function () {
    return (0, _isomorphicFetch2.default)(funcOrIo);
  }) : (0, _IO2.default)(funcOrIo);

  var api = {
    value: value,
    map: function map(f) {
      return Continuation(api.value.map(function (prom) {
        return prom.then(f);
      }));
    },
    flatMap: function flatMap(f) {
      return api.map(f);
    },
    perform: function perform() {
      return api.value.perform();
    }
  };

  return api;
};

exports.default = Continuation;