'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.thunk = thunk;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function thunk(x) {
  return function () {
    return x;
  };
}

var call = exports.call = function call(verb) {
  for (var _len = arguments.length, firstArgs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    firstArgs[_key - 1] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, secondArgs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      secondArgs[_key2] = arguments[_key2];
    }

    return function (app) {
      app[verb].apply(app, _toConsumableArray(firstArgs.concat(secondArgs)));
      return app;
    };
  };
};

var pluck = exports.pluck = function pluck(path) {
  return function (x) {
    return x[path];
  };
};

var isAMonad = exports.isAMonad = function isAMonad(m) {
  return !!(pluck('map')(m) && pluck('flatMap')(m));
};
var nil = exports.nil = function nil(x) {
  return x === null || x === undefined;
};
var isA = exports.isA = function isA(str) {
  return function (x) {
    return (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === str;
  };
};
var isAFunction = exports.isAFunction = isA('function');
var isAString = exports.isAString = isA('string');
var perform = exports.perform = call('perform')();
var run = exports.run = function run() {
  for (var _len3 = arguments.length, ios = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    ios[_key3] = arguments[_key3];
  }

  return ios.forEach(perform);
};
var repeat = exports.repeat = function repeat(io) {
  return {
    every: function every(time) {
      return io.map(function () {
        return setInterval(function () {
          return run(io);
        }, time);
      });
    }
  };
};
var identity = exports.identity = function identity(x) {
  return x;
};
var yes = exports.yes = thunk(true);
var first = exports.first = pluck('0');
var second = exports.second = pluck('1');
var each = exports.each = function each(arr, fs) {
  for (var i = 0; i < arr.length; i++) {
    var returnValue = fs(arr[i], i, arr);
    if (returnValue !== undefined) {
      return returnValue;
    }
  }
};
var match = exports.match = function match() {
  for (var _len4 = arguments.length, tuples = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    tuples[_key4] = arguments[_key4];
  }

  return function () {
    for (var _len5 = arguments.length, xs = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      xs[_key5] = arguments[_key5];
    }

    return each(tuples, function (tuple, i) {
      if (first(tuples[i]).apply(undefined, xs)) {
        return second(tuples[i]).apply(undefined, xs);
      }
    });
  };
};